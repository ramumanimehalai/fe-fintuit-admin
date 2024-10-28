import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-textbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-textbox.component.html',
  styleUrl: './input-textbox.component.scss',
})
export class InputTextboxComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputValue);
  }
}
