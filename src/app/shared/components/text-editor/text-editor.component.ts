import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [QuillModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
})
export class TextEditorComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() validationMessages!: { [key: string]: string };
  @Output() contentChange = new EventEmitter<string>();

  quillConfig = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['clean'],
    ],
  };
  constructor() {}
  ngOnInit(): void {
    // Subscribe to valueChanges of the FormControl
    this.control.valueChanges.subscribe(() => {
      const quillEditor = document.querySelector('.ql-editor') as HTMLElement;
      const html = quillEditor.innerHTML; // Extract the HTML content
      this.contentChange.emit(html); // Emit the HTML content
    });
  }

  getErrorMessage() {
    if (this.control.errors) {
      for (const error in this.control.errors) {
        if (this.control.hasError(error)) {
          return this.validationMessages[error];
        }
      }
    }
    return null;
  }
}
