import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ScopeGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const scopes = (route.data as any).expectedScopes;

    if (!this.auth.isAuthenticated$) {
      this.router.navigateByUrl('/login');
      return false;
    }

    /* if (!this.auth.hasScopes(scopes)) {
      return false;
    } */

    return true;
  }
}
