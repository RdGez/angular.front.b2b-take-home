import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const isLoginRoute = state.url === '/auth';

    if (token) {
      if (isLoginRoute) {
        this.router.navigate(['/apz/home']);
        return false;
      }
      return true;
    } else {
      if (isLoginRoute) {
        return true;
      }
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
