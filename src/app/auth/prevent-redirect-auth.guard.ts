import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreventRedirectAuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuth.pipe(
        take(1),
        switchMap(data => {
          console.log(data);
          if (!data) {
            if (this.authService.autoLogin()) {
              return this.authService.autoLogin();
            }
          }
          return of(data);
        }),
        tap(isAuthenticate => {
          if (isAuthenticate) {
            this.router.navigateByUrl('/lamps/tabs/lamp-list');
          }
        }),
        map(isAuth => {
          return !isAuth;
        })
      );
  }
}
