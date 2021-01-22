import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    return this.auth.isAuthenticated$.pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.auth.login(state.url);
          return false;
        }

        const expectedPermission: string = (next.data as any).permission;

        if (!expectedPermission) {
          return true;
        }

        const userProfile = this.auth.getUserProfile();
        if (!userProfile || !userProfile.permissions) {
          return false;
        }
        const userPermissions = userProfile.permissions as Array<string>;
        return !!userPermissions.find(userScope => userScope === expectedPermission);
      })
    );
  }
}
