import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
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
    CommonModule
  ],
  templateUrl: './add-new-channel.component.html',
  styleUrl: './add-new-channel.component.scss',
})
export class AddNewChannelComponent {
  public configForm!: FormGroup;
  username: string = '';
  selectedAuth: string = '';
  usernameInvalid: boolean = false;
  customHeaderItem: { Key: string; Value: string }[] = []; // Array to hold the response mappings
  requestMappingItem: { dataField: string; mapTo: string }[] = []; // Array to hold the response mappings
  responseMappingItem:  { dataField: string; mapTo: string }[] = [];
  
  toggleStates: { [key: string]: boolean } = {
    email: false,
    textMessage: false,
    whatsapp: false,
    notification: false
  };

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      method: new FormControl('', Validators.required), // Region selection
      authorization: new FormControl('', Validators.required), // Region selection
      channels: this.fb.group({
        custom_heder: new FormControl(false), // Email checkbox
        request_mapping: new FormControl(false), // SMS checkbox
        response_mapping: new FormControl(false), // WhatsApp checkbox
      }),
      customHeaders: this.fb.array([]), // FormArray for custom headers
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
      smsConfig: this.fb.group({
        accountSSID: new FormControl('', Validators.required),
        authToken: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        active: new FormControl(true),
      }),
      whatsappConfig: this.fb.group({
        apiEndpoint: new FormControl('', Validators.required),
        accountSSID: new FormControl('', Validators.required),
        authToken: new FormControl('', Validators.required),
        whatsappNumber: new FormControl('', Validators.required),
        active: new FormControl(true),
      }),
      pushConfig: this.fb.group({
        fcmServerKey: new FormControl('', Validators.required),
        fcmSenderId: new FormControl('', Validators.required),
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
    // Optional: Initialize with one item
    this.customHeaderItem.push({ Key: '', Value: '' });
    this.requestMappingItem.push({ dataField: '', mapTo: '' });
    this.responseMappingItem.push({ dataField: '', mapTo: '' });
  }
  get customHeaders(): FormArray {
    return this.configForm.get('customHeaders') as FormArray;
  }
  
  onSubmit() { }

  getFormControl(groupName: string, controlName: string): FormControl {
    const group = this.configForm.get(groupName) as FormGroup;
    return group.get(controlName) as FormControl;
  }

  getChannelControl(controlName: string): FormControl {
    return this.configForm.get(['channels', controlName]) as FormControl;
  }

  getEmailConfigControl(controlName: string): FormControl {
    return this.getFormControl('emailConfig', controlName);
  }

  getSmsConfigControl(controlName: string): FormControl {
    return this.getFormControl('smsConfig', controlName);
  }

  getWhatsappConfigControl(controlName: string): FormControl {
    return this.getFormControl('whatsappConfig', controlName);
  }

  getPushConfigControl(controlName: string): FormControl {
    return this.getFormControl('pushConfig', controlName);
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

  toggle(key: string) {
    this.toggleStates[key] = !this.toggleStates[key];
  }

  addCustomHeader(event: Event) {
    event.stopPropagation();  
    this.customHeaderItem.push({ Key: '', Value: '' });
  }

  addRequestMapping(event: Event) {
    event.stopPropagation();  
    this.requestMappingItem.push({ dataField: '', mapTo: '' });
  }

  addResponseMapping(event: Event) {
    event.stopPropagation();  
    this.responseMappingItem.push({ dataField: '', mapTo: '' });
  }

  removeCustomHeader(event: Event,index: number) {
    event.stopPropagation();
    if (this.customHeaderItem.length > 0) {
      this.customHeaderItem.splice(index, 1);
    }

    if (this.customHeaderItem.length === 0) {
      this.getChannelControl('custom_heder').setValue(false); // Set checkbox to false
    }
  }

  removeRequestMapping(event: Event,index: number) {
    event.stopPropagation();
    if (this.requestMappingItem.length > 0) {
      this.requestMappingItem.splice(index, 1);
    }

    if (this.requestMappingItem.length === 0) {
      this.getChannelControl('request_mapping').setValue(false); // Set checkbox to false
    }
  }

  removeResponseMapping(event: Event,index: number) {
    event.stopPropagation();
    if (this.responseMappingItem.length > 0) {
      this.responseMappingItem.splice(index, 1);
    }

    if (this.responseMappingItem.length === 0) {
      this.getChannelControl('response_mapping').setValue(false); // Set checkbox to false
    }
  }

  onCustomHeaderChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // If checked, add an item to display textbox
      if (this.customHeaderItem.length === 0) {
        this.customHeaderItem.push({ Key: '', Value: '' });
      }
    }
  }
  onRequestMapping(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // If checked, add an item to display textbox
      if (this.requestMappingItem.length === 0) {
        this.requestMappingItem.push({ dataField: '', mapTo: '' });
      }
    }
  }
  onResponseMapping(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // If checked, add an item to display textbox
      if (this.responseMappingItem.length === 0) {
        this.responseMappingItem.push({ dataField: '', mapTo: '' });
      }
    }
  }
}
