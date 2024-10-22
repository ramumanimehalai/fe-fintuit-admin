import { Component } from '@angular/core';

@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.scss',
})
export class MainSidebarComponent {
  public logoURL: string;
  constructor() {
    this.logoURL = 'assets/images/logo.svg';
  }
}
