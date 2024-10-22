import { effect, Injectable, signal } from '@angular/core';
import { AuthState } from '../config/Interface';
import { SecureStorageService } from './securestorage.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private StorageKey = 'loginAuthe';

  loginAuth = signal(false);
  isCollapse = signal(true);
  constructor(private secureStorage: SecureStorageService) {}

  setState() {
    this.loginAuth.set(true);
    this.secureStorage.setItem(this.StorageKey, this.state);
  }
  setStateCollapse(flag: boolean) {
    this.isCollapse.set(flag);
  }

  get stateCollapse() {
    return this.isCollapse();
  }

  get state() {
    return this.loginAuth();
  }

  clearState() {
    this.loginAuth.update((state): any => {});
  }
}
