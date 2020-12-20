import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authService.currentUserValue;
      console.log("🚀 ~ file: auth.guard.ts ~ line 15 ~ AuthGuard ~ canActivate ~ currentUser", currentUser)
      if (this.authService.isLoggedIn) {
          // check if route is restricted by role
        if (route.data.roles && route.data.roles.includes(currentUser.roles)) {
              // role not authorised so redirect to home page
              this.router.navigate(['/']);
              return false;
          }
          // authorised so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
