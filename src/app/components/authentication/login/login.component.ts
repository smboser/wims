import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private fb: FormBuilder,
    public themeService: CustomizerSettingsService,
    private router: Router,
    private loginService: LoginService,
    private toast: ToastrService
  ) {}

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleCardBorderTheme() {
    this.themeService.toggleCardBorderTheme();
  }

  toggleCardBorderRadiusTheme() {
    this.themeService.toggleCardBorderRadiusTheme();
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  login(): void {
    this.isSubmitting = true;
    let loginData = {
      email: this.email.value,
      password: this.password.value,
    };
    this.loginService.login(loginData).subscribe(
      (res) => {
        console.log('res', res);
        if (res && res.status && res.status === 'success') {
          console.log('res', res);
          this.router.navigateByUrl('/');
        } else {
          this.toast.error('Wrong username / password');
        }
        this.isSubmitting = false;
      },
      (err: HttpErrorResponse) => {
        if (err && err.error && err.error.message) {
          console.log(err.error.message);
          this.toast.error(err.error.message);
        } else {
          this.toast.error('Wrong username / password');
        }
        this.isSubmitting = false;
      }
    );
  }
}
