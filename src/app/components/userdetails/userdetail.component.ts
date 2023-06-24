import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDetailService } from './userdetail.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  id: any = 0;
  hide = true;
  countries: { id: number; name: string }[] = [];
  states: any = [];
  isSubmitting = false;
  UserInfo: any = {};
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
    address1: ['', [Validators.required]],
    address2: [''],
    city: ['', [Validators.required]],
    district: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    pincode: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public themeService: CustomizerSettingsService,
    private toast: ToastrService,
    private userDetailService: UserDetailService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private _router: Router
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

  get address1() {
    return this.registrationForm.get('address1')!;
  }

  get address2() {
    return this.registrationForm.get('address2')!;
  }

  get city() {
    return this.registrationForm.get('city')!;
  }

  get district() {
    return this.registrationForm.get('district')!;
  }

  get country() {
    return this.registrationForm.get('country')!;
  }

  get state() {
    return this.registrationForm.get('state')!;
  }

  get pincode() {
    return this.registrationForm.get('pincode')!;
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

  ngOnInit() {
    this.userDetailService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
    this._Activatedroute.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      console.log('bnhtyu=' + this.id);
      let detailData = {
        userId: parseInt(this.id),
      };

      this.userDetailService.getUserDetails(detailData).subscribe(
        (res) => {
          console.log('res', res);
          if (res && res.status && res.status === 'success') {
            //this.registrationForm = res.response;
            const info = res.response;
            let slectedCountry = parseInt(info.country);
            this.userDetailService.getStates().subscribe((states) => {
              this.states = states.filter(
                (state: any) => state.country_id === slectedCountry
              );
            });
            this.UserInfo = {
              fname: info.fname,
              lname: info.lname,
              email: info.email,
              phonePrimary: info.phone_primary,
              phoneSecondary: info.phone_secondary,
              address1: info.address1,
              address2: info.address2,
              city: info.city,
              district: info.district,
              country: parseInt(info.country),
              state: parseInt(info.state),
              pincode: info.pincode,
            };
          } else {
            this.toast.error(
              `Error!!! Please try later - ${JSON.stringify(res.message)}`
            );
          }
        },
        (err) => {
          if (err && err.error && err.error.message) {
            console.log(err.error.message);
            this.toast.error(err.error.message);
          } else {
            this.toast.error('Error!!! Please try later');
          }
        }
      );
    });
  }

  handleChangeCountry(event: any) {
    let slectedCountry = event.value;
    this.userDetailService.getStates().subscribe((states) => {
      this.states = states.filter(
        (state: any) => state.country_id === slectedCountry
      );
    });
    // For testing purpose
    // this.checkInvalid();
  }

  register() {
    this.isSubmitting = true;

    if (this.registrationForm.valid) {
      let registerData = {
        ...this.registrationForm.value,
        state: parseInt(this.state.value),
        country: parseInt(this.country.value),
        phone_primary: this.phonePrimary.value,
        phone_secondary: this.phoneSecondary.value,
        user_type: 'stockist',
      };
      delete registerData.confirmPassword; // Removing confirm password
      delete registerData.phonePrimary;
      delete registerData.phoneSecondary;

      this.userDetailService.register(registerData).subscribe(
        (res) => {
          console.log('res', res);
          if (res && res.status && res.status === 'success') {
            this.toast.success('User registered successfully.');
            this.router.navigateByUrl('authentication/login');
          } else {
            this.toast.error(
              `Error!!! Please try later - ${JSON.stringify(res.message)}`
            );
          }
          this.isSubmitting = false;
        },
        (err) => {
          if (err && err.error && err.error.message) {
            console.log(err.error.message);
            this.toast.error(err.error.message);
          } else {
            this.toast.error('Error!!! Please try later');
          }
          this.isSubmitting = false;
        }
      );
    }
  }

  checkInvalid() {
    if (this.registrationForm.invalid) {
      // The entire form is invalid
      console.log('Form is invalid.');
      // Loop through the form controls
      Object.keys(this.registrationForm.controls).forEach((controlName) => {
        let control = controlName;
        if (this.registrationForm.get(control)?.invalid) {
          console.log(`Invalid control: ${controlName}`);
        }
      });
    } else {
      // Form is valid, perform submit logic
      console.log('Form is valid');
    }
  }
}
