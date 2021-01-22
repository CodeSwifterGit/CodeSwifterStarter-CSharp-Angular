import { Injectable } from '@angular/core';
import createAuth0Client, { LogoutOptions } from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, Subject, combineLatest, throwError, onErrorResumeNext } from 'rxjs';
import { tap, catchError, concatMap, shareReplay, take } from 'rxjs/operators';


import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { UserInfoService } from 'app/services/auth/user-info.service';

@Injectable()
export class AuthService {
  private _destroy = new Subject<boolean>();
  private postAuthorizeUrl = `${window.location.protocol}//${window.location.hostname}`+ (window.location.port === '80' ? '' : `:${window.location.port}`) + `${environment.authorizePath}`;
    

  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client(Object.assign({},
      {
        domain: environment.authConfig.domain,
        client_id: environment.authConfig.clientId,
        audience: environment.authConfig.audience,
        redirect_uri: this.postAuthorizeUrl
      }))
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every team receives the same shared value
    catchError(err => 
      throwError(err)
      ),
      takeUntil(this._destroy)
  );

  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => {
      this.loggedIn = res;
    }),
    takeUntil(this._destroy)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback())),
    takeUntil(this._destroy)
  );
  // Create subject and public observable of user profile data
  private _userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this._userProfileSubject.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(public router: Router, private readonly userInfoService: UserInfoService) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.complete();
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => {
        this.userInfoService.GetPermissions()
        .pipe(
          take(1),
          takeUntil(this._destroy)
          )
        .subscribe(res => {
          user.permissions = res;
          this._userProfileSubject.next(user);
        })
      })
    );
  }

  private localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      catchError(err => of({})),
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect(Object.assign({},
        {
          redirect_uri: this.postAuthorizeUrl,
          audience: environment.authConfig.audience,
          appState: { target: redirectPath }
        }));
    });
  }

  private handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (!!params && params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        tap(cbRes => {
          // Get and set target redirect route from callback results
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),
        concatMap(() => {
          // Redirect callback complete; get user and login status
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete$.subscribe(([user, loggedIn]) => {
        // Redirect to target route after callback processing
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout(Object.assign({},
        {
          client_id: environment.authConfig.clientId,
          returnTo: window.location.origin
        }) as LogoutOptions);
    });
  }

  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }

  getUserProfile(): any {
    return this._userProfileSubject.value;
  }
}
