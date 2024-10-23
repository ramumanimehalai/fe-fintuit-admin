import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SecureStorageService {
  constructor(private secureStorage: CookieService) {}

  setItem(key: string, message: any) {
    localStorage.setItem(key, message);
  }
  setObj(key: string, Obj: object) {
    localStorage.setItem(key, JSON.stringify(Obj));
  }
  getItem(value: string) {
    const Object: any = localStorage.getItem(value);
    return JSON.parse(Object);
  }
  delete() {
    this.secureStorage.deleteAll();
  }
}
