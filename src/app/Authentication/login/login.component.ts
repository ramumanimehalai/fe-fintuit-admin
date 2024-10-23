import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureStorageService } from '../../service/securestorage.service';
import { CookieService } from 'ngx-cookie-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { DsButtonComponent } from 'jas-ui-lib';
import { CommonModule } from '@angular/common';
import { InputTextboxComponent } from '../../shared/components/input-textbox/input-textbox.component';
import { authTokenKey } from '../../constants/auth-constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DsButtonComponent,
    CommonModule,
    InputTextboxComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean = false;
  form!: FormGroup;

  constructor(
    private route: Router,
    private storage: SecureStorageService,
    private cookieService: CookieService,
    private apiservice: ApiService,
  ) {
    this.createForm();
  }
  ngOnInit(): void {}
  createForm() {
    this.form = new FormGroup({
      crediential: new FormControl('zignifyadmin@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('English@1822', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  getFormControl(value: string): FormControl {
    return this.form.get(value) as FormControl;
  }

  handleOnClick() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isSubmitted = true;
      const payload = {
        ...this.form.value,
      };
      this.apiservice.onLogin(payload).subscribe({
        next: (res) => {
            this.setCookieStorage(res);
            this.setLocalStorage();
        },
        error: (error) => {
          this.isSubmitted = false;
          console.log('error-->', error);
        },
        complete: () => {
          this.route.navigate(['/']);
        },
      });
    }
  }

  setLocalStorage() {
    if (this.cookieService.get(authTokenKey)) {
      this.storage.setItem('auth', true);
    }
  }
  setCookieStorage(res: any) {
    this.cookieService.set(authTokenKey, res.token);
    this.cookieService.set('organization_id', res.tenant.organization_id);
    this.cookieService.set(
      'authenticated_user_id',
      res.user.id.toString(),
    );
    this.cookieService.set('locale', res.tenant.metadata.language || 'en');
    this.cookieService.set('tenant_id', res.tenant.id.toString());
  }
}
