import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SecureStorageService } from '../service/securestorage.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private secureStorage: SecureStorageService,
    private router: Router,
    private cookieService: CookieService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    const authState = this.cookieService.get('token') ? true : false;
    if (!authState) {
      this.secureStorage.delete();
      this.router.navigateByUrl('/auth/login');
      return false;
    }

    return true;
  }
}
