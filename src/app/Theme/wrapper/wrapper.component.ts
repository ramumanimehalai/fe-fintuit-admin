import { Component, effect } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { MainSidebarComponent } from '../main-sidebar/main-sidebar.component';
import { StateService } from '../../Service/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    CommonModule,
    MainSidebarComponent,
  ],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
})
export class WrapperComponent {
  public showWrapper: boolean = false;
  isLoader: boolean = false;
  constructor(private state: StateService) {
    effect(() => {
      this.showWrapper = this.state.stateCollapse;
    });
  }
}
