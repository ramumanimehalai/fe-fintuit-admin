import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  isCollapse = signal(true);
  constructor() {}

  setStateCollapse(flag: boolean) {
    this.isCollapse.set(flag);
  }

  get stateCollapse() {
    return this.isCollapse();
  }

}
