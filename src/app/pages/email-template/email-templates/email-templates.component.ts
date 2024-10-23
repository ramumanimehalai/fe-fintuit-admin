import { Component, OnInit } from '@angular/core';
import { DsButtonComponent, DsDropdwonPopupComponent, DsIconComponent } from 'jas-ui-lib';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from '../../../service/api.service';

interface EmailTemplate {
  title: string;
  description: string;
  templatecode: string;
  icon: string;
}

@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [DsButtonComponent, DsIconComponent, CommonModule,MatTooltipModule, DsDropdwonPopupComponent],
  templateUrl: './email-templates.component.html',
  styleUrl: './email-templates.component.scss',
})
export class EmailtemplateComponent implements OnInit {
  constructor(private route: Router, private apiService: ApiService) {}
  emailTemplates: EmailTemplate[] = [];
  emailTemplateSettings =[];
  ngOnInit(): void {
    this.emailTemplatesSettings()
    this.emailTemplates = [
      // {
      //   title: 'New User Onboarding Email',
      //   description:
      //     'When a new user is added, an email has to be sent to the user with a password.',
      //   templatecode: '102',
      //   icon: 'icon', // replace with actual icon name if needed
      // },
      // {
      //   title: 'New User Onboarding Email',
      //   description:
      //     'When a new user is added, an email has to be sent to the user with a password.',
      //     templatecode: '102',
      //   icon: 'icon', // replace with actual icon name if needed
      // },
      // {
      //   title: 'New User Onboarding Email',
      //   description:
      //     'When a new user is added, an email has to be sent to the user with a password.',
      //     templatecode: '102',
      //   icon: 'icon', // replace with actual icon name if needed
      // },
    ];
  }
  emailTemplatesSettings(){
    console.log('emailTemplatesSettings')
  this.apiService.getAllChannels({page: 1, size: 10}).subscribe({
    next: (res: any) => {
      console.log(res,"responseValue")
      this.emailTemplateSettings = res.data
    },
    error: (error) => {
      console.error('error-->', error);
    },
    complete: () => {
      // handle loaders
    },
  })
  }
  dropDownOptions = [
    { label: 'Edit', key: 'edit' },
    { label: 'Delete', key: 'delete' },
    { label: 'Pause', key: 'pause' }
  ];

  get isEmptyList() {
    return !this.emailTemplates.length;
  }
  navigateTo(url: string) {
    this.route.navigateByUrl(url);
  }
  onButtonClicked(event: any): void {
    console.log('Dropdown option selected:', event);
  }
}
