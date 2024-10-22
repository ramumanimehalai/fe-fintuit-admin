import { Component, OnInit } from '@angular/core';
import { DsButtonComponent, DsIconComponent } from 'jas-ui-lib';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface EmailTemplate {
  title: string;
  description: string;
  templatecode: string;
  icon: string;
}

@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [DsButtonComponent, DsIconComponent, CommonModule],
  templateUrl: './email-templates.component.html',
  styleUrl: './email-templates.component.scss',
})
export class EmailtemplateComponent implements OnInit {
  constructor(private route: Router) {}
  emailTemplates: EmailTemplate[] = [];

  ngOnInit(): void {
    this.emailTemplates = [
      {
        title: 'New User Onboarding Email',
        description:
          'When a new user is added, an email has to be sent to the user with a password.',
        templatecode: '102',
        icon: 'icon', // replace with actual icon name if needed
      },
      {
        title: 'New User Onboarding Email',
        description:
          'When a new user is added, an email has to be sent to the user with a password.',
          templatecode: '102',
        icon: 'icon', // replace with actual icon name if needed
      },
      {
        title: 'New User Onboarding Email',
        description:
          'When a new user is added, an email has to be sent to the user with a password.',
          templatecode: '102',
        icon: 'icon', // replace with actual icon name if needed
      },
    ];
  }

  get isEmptyList() {
    return !this.emailTemplates.length;
  }
  navigateTo(url: string) {
    this.route.navigateByUrl(url);
  }
}
