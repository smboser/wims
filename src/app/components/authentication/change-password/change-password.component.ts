import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, Validators,AbstractControl,ValidationErrors,FormControl, } from '@angular/forms';
import { ChangePassService } from './change-password.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../login/token.service';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  hide = true;
  isSubmitting = false;

  confirmValidator = (
    control: FormControl<string>
  ): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      control.value !== this.changepasswordForm.controls.password.value
    ) {
      return { error: true, confirm: true };
    }
    return {};
  };

  changepasswordForm = this.fb.nonNullable.group({
    oldpassword: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required, this.confirmValidator]],
  });

  constructor(
    private fb: FormBuilder,
    public themeService: CustomizerSettingsService,
    private router: Router,
    private changePassService: ChangePassService,
    private toast: ToastrService,
    private tokenService: TokenService
  ) {}

  get confirmPassword() {
    return this.changepasswordForm.get('confirmPassword')!;
  }

  get password() {
    return this.changepasswordForm.get('password')!;
  }

  get oldpassword() {
    return this.changepasswordForm.get('oldpassword')!;
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
    let tokenData= this.tokenService.getBearerToken();
    const decodedToken: any= jwtDecode((tokenData));
    const { id } = decodedToken;
    console.log("gsdfhsdfjsjd=" + id);
    let loginData = {
      oldPassword: this.oldpassword.value,
      newPassword: this.password.value,
      userId:id,
    };
   
     
    console.log("DDRTF="+loginData)
    this.changePassService.changePass(loginData).subscribe(
      (res) => {
        console.log('res', res);
        if (res && res.status && res.status === 'success') {
          console.log('res', res);
          this.toast.success(res.message);
        } else {
          this.toast.error('Wrong  password');
        }
        this.isSubmitting = false;
      },
      (err: HttpErrorResponse) => {
        if (err && err.error && err.error.message) {
          console.log(err.error.message);
          this.toast.error(err.error.message);
        } else {
          this.toast.error('Wrong  password');
        }
        this.isSubmitting = false;
      }
    );
  }
}
