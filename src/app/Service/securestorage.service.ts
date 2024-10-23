import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authTokenKey } from '../constants/auth-constants';

@Injectable({
  providedIn: 'root',
})
export class SecureStorageService {
  constructor(private secureStorage: CookieService) {}

  setCookieStorage(res: any) {
    // TODO: Dummy token for now
    this.secureStorage.set(authTokenKey, res?.token || "dummy_token");
  }

  delete() {
    this.secureStorage.deleteAll();
  }
}
