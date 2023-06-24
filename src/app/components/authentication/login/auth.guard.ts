import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { TokenService } from './token.service';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = route.data['roles'] as Array<string>;
    return this.authenticate(roles);
  }

  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree {
  //   const roles = childRoute.data['roles'] as Array<string>;
  //   return this.authenticate(roles);
  // }

  private async authenticate(roles: string[]): Promise<boolean | UrlTree> {
    console.log('roles', roles);
    return this.check() && (await this.isAuthorized(roles))
      ? true
      : this.router.parseUrl('/authentication/login');
  }

  private async isAuthorized(roles: string[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.tokenService.user$.subscribe((users) => {
        let userRoles = users.usertype;
        const isAuthorized = roles.some((role) => userRoles?.includes(role));
        if (isAuthorized === true) resolve(true);
        else resolve(false);
      });
    });
  }

  private check(): boolean {
    if (this.tokenService.valid()) {
      return true;
    }
    return false;
  }
}
