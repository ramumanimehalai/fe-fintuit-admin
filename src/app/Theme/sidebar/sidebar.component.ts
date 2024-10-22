import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { StateService } from '../../Service/state.service';
import { Router } from '@angular/router';
import { sidebarContent } from '../../config/constant';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatAccordion, MatExpansionModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  public isOpen: boolean = false;
  public isSubmenuOpen: boolean = false;
  activeSubmenu: string | null = null;
  public sidebarconstant!: any;
  constructor(
    private state: StateService,
    private route: Router,
  ) {
    effect(() => {
      this.isOpen = this.state.stateCollapse;
      this.sidebarconstant = sidebarContent;
    });
  }

  ngOnInit(): void {
    this.initialActiveSubmenu(this.route.url);
  }
  // Toggle submenu visibility
  toggleSubmenu(option: any): void {
    option.isSubmenuOpen = !option.isSubmenuOpen;
  }

  initialActiveSubmenu(url: string) {
    //  console.log('/',url.split('/').indexOf(0))
  }
  navigateTo(url: string) {
    this.activeSubmenu = url;
    this.route.navigate([url]);
  }
}
