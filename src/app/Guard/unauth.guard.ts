import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authTokenKey } from '../constants/auth-constants';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {}

  canActivate(): boolean {
    const authState: any = this.cookieService.get(authTokenKey) ? true : false;

    if (authState) {
      this.router.navigateByUrl('');
      return true;
    }

    return true;
  }
}
