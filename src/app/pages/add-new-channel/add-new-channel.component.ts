import { Component } from '@angular/core';
import {
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
  toggleStates: { [key: string]: boolean } = {
    email: true,
    textMessage: false,
    whatsapp: false,
    notification: false
  };

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      method: new FormControl('', Validators.required), // Region selection
      authorization: new FormControl('', Validators.required), // Region selection
      channels: this.fb.group({
        email: new FormControl(true), // Email checkbox
        sms: new FormControl(true), // SMS checkbox
        whatsapp: new FormControl(true), // WhatsApp checkbox
        pushNotifications: new FormControl(true), // Push Notifications checkbox
      }),
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
        username: new FormControl(''), // Username for Basic Auth
        password: new FormControl(''), // Password for Basic Auth
        token: new FormControl(''), // Token for Bearer token
        key: new FormControl(''), // Key for API Key
        value: new FormControl(''), // Value for API Key
      }),
    });
  }

  ngOnInit() {}

  onSubmit() {}

  getFormControl(groupName: string, controlName: string): FormControl {
    const group = this.configForm.get(groupName) as FormGroup;
    return group.get(controlName) as FormControl;
  }

  getChannelControl(controlName: string): FormControl {
    return this.getFormControl('channels', controlName);
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

  onSelectMethod(e: any) {
    this.configForm.get('method')?.setValue(e.target.value);
  }
  onSelectAuthorization(e: any) {
    const selectedValue = e.target.value;
    console.log(selectedValue,"selectedValue")
    this.configForm.get('authorizationConfig')?.setValue(selectedValue);
    this.selectedAuth = selectedValue; // Update selectedAuth for visibility control
  }
  toggle(key: string) {
    this.toggleStates[key] = !this.toggleStates[key];
  }
  
}
