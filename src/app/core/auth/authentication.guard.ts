import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.auth.isLoggedIn()
      ? this.auth.isLoggedIn()
      : this.router.createUrlTree(['/loginPage']);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.isLoggedIn()
      ? this.auth.isLoggedIn()
      : this.router.createUrlTree(['/loginPage']);
  }
}
