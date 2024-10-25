import { Component } from '@angular/core';
import { InputTextboxComponent } from '../../../shared/components/input-textbox/input-textbox.component';
import { TextEditorComponent } from '../../../shared/components/text-editor/text-editor.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DsButtonComponent } from 'jas-ui-lib';
import { RichTextEditorComponent } from '../../../shared/components/rich-text-editor/rich-text-editor.component';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-email-template',
  standalone: true,
  imports: [
    InputTextboxComponent,
    TextEditorComponent,
    ReactiveFormsModule,
    DsButtonComponent,
    RichTextEditorComponent,
    CommonModule,
  ],
  templateUrl: './new-email-template.component.html',
  styleUrls: ['./new-email-template.component.scss'],
})
export class NewemailtemplateComponent {
  public form!: FormGroup;
  emailContent: string = ''; // Store the raw HTML content
  previewContent!: SafeHtml; // Store the sanitized content for preview
  username: string = '';
  usernameInvalid: boolean = false;
  editorContent: SafeHtml = '';
  templateID: string= '';
  isEdit: boolean = false

  constructor(private sanitizer: DomSanitizer, private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      templateCode: new FormControl('', [Validators.required]),
      templateName: new FormControl(''),
      templateDescription: new FormControl(''),
      emailSubject: new FormControl('', [Validators.required]),
      text_editor: new FormControl('', [Validators.required]),
    });
    this.route.params.subscribe(params => {
      const templateCode = params['id'];
      if (templateCode) {
        this.isEdit = true
        this.loadTemplateData(templateCode);
      }
    });
  }

  loadTemplateData(templateCode: string) {
    // Example API call to get template data by code
    this.apiService.getTemplateByCode(templateCode).subscribe({
      next: (response : any) => {
        this.templateID = response.data.id,
        this.form.patchValue({
          templateCode: response.data.templateCode,
          emailSubject: response.data.emailSubject,
          text_editor: response.data.emailContent,
        });
        this.emailContent = response.data.emailContent;
        this.previewContent = this.sanitizeContent(response.data.emailContent);
      },
      error: (error) => {
        console.error('Error loading email template:', error);
      },
    });
  }

  save() {
    Object.keys(this.form.controls).forEach((control) => {
      this.form.get(control)?.markAsTouched();
    });
    if (!this.form.valid) {
      return;
    }

    const templateData = {
      templateCode: this.form.value.templateCode,
      emailSubject: this.form.value.emailSubject,
      emailContent: this.emailContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 0,
      updatedBy: 0,
    };
    console.log(this.templateID,"templateIDUP")
    if(this.templateID){
      this.apiService.updateTemplateById(this.templateID, templateData).subscribe({
        next: (response :any) => {
          console.log('Email template updated successfully:', response);
          this.form.reset();
          this.emailContent = '';
        },
        error: (error) => {
          console.error('Error updating email template:', error);
        },
      });
    }
    else{
      this.apiService.createEmailTemplate(templateData).subscribe({
        next: (response) => {
          console.log('Email template created successfully:', response);
          this.form.reset();
          this.emailContent = '';
        },
        error: (error) => {
          console.error('Error creating email template:', error);
        },
      });
    }
  }

  onUsernameChange(newUsername: string): void {
    this.username = newUsername;
    this.validateUsername();
  }

  validateUsername(): void {
    this.usernameInvalid = this.username.trim().length === 0;
  }

  getFormControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl;
  }

  onContentChange(event: string) {
    this.editorContent = this.sanitizer.bypassSecurityTrustHtml(event);
  }
  // Capture the content change from the rich text editor
  onRichTextContentChange(content: string) {
    this.emailContent = content; // Store the raw content
    this.previewContent = this.sanitizeContent(content); // Sanitize the content for preview
    this.form.get('text_editor')?.setValue(content);
  }

  // Sanitize the content to allow safe HTML rendering
  sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
