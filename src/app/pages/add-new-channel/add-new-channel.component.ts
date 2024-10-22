import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DsButtonComponent } from 'jas-ui-lib';
import { InputTextboxComponent } from '../../shared/components/input-textbox/input-textbox.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-add-new-channel',
  standalone: true,
  imports: [
    InputTextboxComponent,
    ReactiveFormsModule,
    DsButtonComponent,
    MatTabsModule,
  ],
  templateUrl: './add-new-channel.component.html',
  styleUrl: './add-new-channel.component.scss',
})
export class AddNewChannelComponent {
  public configForm!: FormGroup;
  username: string = '';
  usernameInvalid: boolean = false;

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      region: new FormControl('', Validators.required), // Region selection
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

  onSelectRegion(e: any) {
    this.configForm.get('region')?.setValue(e.target.value);
  }
}
