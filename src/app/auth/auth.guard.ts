import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuth.pipe(
        take(1),
        switchMap(data => {
          if (!data) {
            return this.authService.autoLogin();
          } else {
            return of(data);
          }
        }),
        tap(isAuth => {
          if (!isAuth) {
            return this.router.navigateByUrl('/auth');
          }
        })
      );
  }
}
