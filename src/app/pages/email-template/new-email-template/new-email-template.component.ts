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

@Component({
  selector: 'app-new-email-template',
  standalone: true,
  imports: [
    InputTextboxComponent,
    TextEditorComponent,
    ReactiveFormsModule,
    DsButtonComponent,
    RichTextEditorComponent,
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

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.form = new FormGroup({
      templateId: new FormControl('', [Validators.required]),
      templateName: new FormControl('', [Validators.required]),
      templateDescription: new FormControl('', [Validators.required]),
      emailSubject: new FormControl('', [Validators.required]),
      text_editor: new FormControl('', [Validators.required]),
    });
  }

  save() {
    Object.keys(this.form.controls).forEach((control) => {
      this.form.get(control)?.markAsTouched();
    });

    if (!this.form.valid) {
      console.log('Form is invalid', this.form.errors);
      return;
    }

    console.log('Form Submitted!', this.form.value);
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
    }
  
    // Sanitize the content to allow safe HTML rendering
    sanitizeContent(content: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}
