import { Component, effect } from '@angular/core';

import { StateService } from '../../Service/state.service';
import { SecureStorageService } from '../../Service/securestorage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DsButtonComponent } from 'jas-ui-lib';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DsButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isCollapse: boolean = false;

  constructor(
    private state: StateService,
    private storage: SecureStorageService,
    private route: Router,
  ) {
    effect(() => {
      this.isCollapse = this.state.stateCollapse;
    });
  }
  collapseSidebar() {
    this.state.setStateCollapse(!this.isCollapse);
  }

  handleOnLogout() {
    this.storage.delete();
    this.route.navigateByUrl('auth/login');
  }
}
