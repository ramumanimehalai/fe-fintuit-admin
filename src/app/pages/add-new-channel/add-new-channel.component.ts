import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DsButtonComponent, DsIconComponent, DsToggleComponent } from 'jas-ui-lib';
import { InputTextboxComponent } from '../../shared/components/input-textbox/input-textbox.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-channel',
  standalone: true,
  imports: [
    InputTextboxComponent,
    ReactiveFormsModule,
    DsButtonComponent,
    MatTabsModule,
    DsIconComponent,
    DsToggleComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-new-channel.component.html',
  styleUrl: './add-new-channel.component.scss',
})
export class AddNewChannelComponent {
  public configForm!: FormGroup;
  username: string = '';
  selectedAuth: string = '';
  isCustomHeaderEnabled: boolean = false; // Initialize to false
  requestMappingEnabled: boolean = false; // Initialize to false
  responseMappingEnabled: boolean = false; // Initialize to false

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      method: new FormControl('', Validators.required),
      authorization: new FormControl('', Validators.required),
      channels: this.fb.group({
        custom_heder: new FormControl(false),
        request_mapping: new FormControl(false),
        response_mapping: new FormControl(false),
      }),
      customHeaders: this.fb.array([]),
      requestMappings: this.fb.array([]), // FormArray for request mappings
      responseMappings: this.fb.array([]), // FormArray for response mappings
      emailConfig: this.fb.group({
        smtpServer: new FormControl('', Validators.required),
        smtpPort: new FormControl('', Validators.required),
        smtpUserName: new FormControl('', Validators.required),
        smtpPassword: new FormControl('', Validators.required),
        senderName: new FormControl('', Validators.required),
        senderEmail: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        enableTLS: new FormControl(false),
        active: new FormControl(true),
      }),
      authorizationConfig: this.fb.group({
        authorization: new FormControl('', Validators.required), // Authorization selection
        username: new FormControl('', Validators.required), // Username for Basic Auth
        password: new FormControl('', Validators.required), // Password for Basic Auth
        token: new FormControl('', Validators.required), // Token for Bearer token
        key: new FormControl('', Validators.required), // Key for API Key
        value: new FormControl('', Validators.required), // Value for API Key
        apiEndpoint: new FormControl('', Validators.required),
      }),

    });
  }

  ngOnInit(): void {
  }
  get customHeaders(): FormArray {
    return this.configForm.get('customHeaders') as FormArray;
  }
  get requestMappings(): FormArray {
    return this.configForm.get('requestMappings') as FormArray;
  }
  get responseMappings(): FormArray {
    return this.configForm.get('responseMappings') as FormArray;
  }
  onSubmit() { }

  getFormControl(groupName: string, controlName: string): FormControl {
    const group = this.configForm.get(groupName) as FormGroup;
    return group.get(controlName) as FormControl;
  }

  getEmailConfigControl(controlName: string): FormControl {
    return this.getFormControl('emailConfig', controlName);
  }

  getAuthorizationConfig(controlName: string): FormControl {
    return this.getFormControl('authorizationConfig', controlName);
  }

  onSelectMethod(e: any) {
    this.configForm.get('method')?.setValue(e.target.value);
  }
  onSelectAuthorization(e: any) {
    const selectedValue = e.target.value;
    this.configForm.get('authorizationConfig.authorization')?.setValue(selectedValue);
    this.selectedAuth = selectedValue;
  }
  removeCustomHeader(event: Event,index: number): void {
    event.stopPropagation();
    this.customHeaders.removeAt(index);
    if (this.customHeaders.length === 0) {
      this.isCustomHeaderEnabled = false;
    }
  }
  addCustomHeader(event?: Event): void {
    event?.stopPropagation();
    const hasEmptyHeader = this.customHeaders.controls.some((header) => {
      const keyControl = header.get('key');
      const valueControl = header.get('Value');
      return !keyControl?.value || !valueControl?.value;
    });

    if (hasEmptyHeader) {
      this.customHeaders.controls.forEach((header) => {
        const keyControl = header.get('key');
        const valueControl = header.get('Value');

        keyControl?.markAsTouched();
        valueControl?.markAsTouched();
      });
      return;
    }

    const headerGroup = this.fb.group({
      key: new FormControl('', Validators.required),
      Value: new FormControl('', Validators.required)
    });
    this.customHeaders.push(headerGroup);
  }

  toggleCustomHeaders(): void {
    if (this.isCustomHeaderEnabled && this.customHeaders.length === 0) {
      this.addCustomHeader()
    } else if (!this.isCustomHeaderEnabled) {
      this.customHeaders.clear();
    }
  }
  addRequestMapping(event?: Event): void {
    event?.stopPropagation();
    const hasEmptyMapping = this.requestMappings.controls.some((mapping) => {
      const keyControl = mapping.get('key');
      const valueControl = mapping.get('Value');
      return !keyControl?.value || !valueControl?.value;
    });

    if (hasEmptyMapping) {
      this.requestMappings.controls.forEach((mapping) => {
        const keyControl = mapping.get('key');
        const valueControl = mapping.get('Value');
        keyControl?.markAsTouched();
        valueControl?.markAsTouched();
      });
      return;
    }

    const mappingGroup = this.fb.group({
      key: new FormControl('', Validators.required),
      Value: new FormControl('', Validators.required)
    });
    this.requestMappings.push(mappingGroup);
  }

  removeRequestMapping(event: Event, index: number): void {
    event.stopPropagation();
    this.requestMappings.removeAt(index);
    if (this.requestMappings.length === 0) {
      this.requestMappingEnabled = false; // Uncheck if empty
    }
  }

  toggleRequestMappings(): void {
    if (this.requestMappingEnabled && this.requestMappings.length === 0) {
      this.addRequestMapping();
    } else if (!this.requestMappingEnabled) {
      this.requestMappings.clear();
    }
  }
  addResponseMapping(event?: Event): void {
    event?.stopPropagation();
    const hasEmptyMapping = this.responseMappings.controls.some((mapping) => {
      const keyControl = mapping.get('key');
      const valueControl = mapping.get('Value');
      return !keyControl?.value || !valueControl?.value;
    });

    if (hasEmptyMapping) {
      this.responseMappings.controls.forEach((mapping) => {
        const keyControl = mapping.get('key');
        const valueControl = mapping.get('Value');
        keyControl?.markAsTouched();
        valueControl?.markAsTouched();
      });
      return;
    }

    const mappingGroup = this.fb.group({
      key: new FormControl('', Validators.required),
      Value: new FormControl('', Validators.required)
    });
    this.responseMappings.push(mappingGroup);
  }

  removeResponseMapping(event: Event, index: number): void {
    event.stopPropagation();
    this.responseMappings.removeAt(index);
    if (this.responseMappings.length === 0) {
      this.responseMappingEnabled = false; // Uncheck if empty
    }
  }

  toggleResponseMappings(): void {
    if (this.responseMappingEnabled && this.responseMappings.length === 0) {
      this.addResponseMapping();
    } else if (!this.responseMappingEnabled) {
      this.responseMappings.clear();
    }
  }
}
