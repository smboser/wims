import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;

  confirmValidator = (
    control: FormControl<string>
  ): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      control.value !== this.registrationForm.controls.password.value
    ) {
      return { error: true, confirm: true };
    }
    return {};
  };

  registrationForm = this.fb.nonNullable.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required, this.confirmValidator]],
    phonePrimary: ['', [Validators.required]],
    phoneSecondary: [''],
  });

  constructor(
    private fb: FormBuilder,
    public themeService: CustomizerSettingsService,
    private toast: ToastrService
  ) {}

  get fname() {
    return this.registrationForm.get('fname')!;
  }

  get lname() {
    return this.registrationForm.get('lname')!;
  }

  get email() {
    return this.registrationForm.get('email')!;
  }

  get password() {
    return this.registrationForm.get('password')!;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')!;
  }

  get phonePrimary() {
    return this.registrationForm.get('phonePrimary')!;
  }

  get phoneSecondary() {
    return this.registrationForm.get('phoneSecondary')!;
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

  register() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      // TODO: submit registration
      console.log('TODO: call registration service once api is ready');
    }
  }
}
