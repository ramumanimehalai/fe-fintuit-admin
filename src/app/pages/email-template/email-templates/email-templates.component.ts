import { Component, OnInit } from '@angular/core';
import { DsButtonComponent, DsDropdwonPopupComponent, DsIconComponent } from 'jas-ui-lib';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from '../../../service/api.service';

interface EmailTemplate {
  title: string;
  description: string;
  templateCode: string;
  createdAt: string;
  updatedAt: string;
  icon?: string;
  id?:string
}

@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [DsButtonComponent, DsIconComponent, CommonModule, MatTooltipModule, DsDropdwonPopupComponent],
  templateUrl: './email-templates.component.html',
  styleUrl: './email-templates.component.scss',
})
export class EmailtemplateComponent implements OnInit {
  constructor(private route: Router, private apiService: ApiService) { }
  emailTemplates: EmailTemplate[] = [];

  ngOnInit(): void {
    this.emailTemplatesSettings()
  }

  emailTemplatesSettings(page: number = 1, size: number = 10): void {
    this.apiService.getAllEmailTemplate({ page, size }).subscribe({
      next: (res: any) => {
        if (Array.isArray(res.data.data)) {
          this.emailTemplates = res.data.data.map((item: any) => ({
            title: item.emailSubject,
            description: this.convertHtmlToText(item.emailContent),
            templateCode: item.templateCode,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            icon: '',
            id: item.id
          }));
        } else {
          console.error('Expected an array but received:', res.data);
          this.emailTemplates = [];
        }
      },
      error: (err: any) => {
        console.error('Error occurred while fetching email templates:', err);
      },
      complete: () => {
        console.log('Request complete.');
      },
    });
  }


  convertHtmlToText(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || ''; // Extract plain text from HTML
  }
  dropDownOptions = [
    { label: 'Edit', key: 'edit' },
    { label: 'Delete', key: 'delete' },
  ];

  get isEmptyList() {
    return !this.emailTemplates.length;
  }
  navigateTo(url: string) {
    this.route.navigateByUrl(url);
  }
  onButtonClicked(event: any, template: EmailTemplate): void {
    if (event === 'edit') {
      this.route.navigate([`/create-new-email-template/${template.templateCode}`]);
    } else if (event.key && event.key === 'delete') {
      console.log('Delete action for template:', template.templateCode);
    }
  }  
}

