import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  countries: { id: number; name: string }[] = [];
  states: any = [];

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
    private loginService: LoginService
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
    this.loginService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  handleChangeCountry(event: any) {
    console.log(this.registrationForm.valid);
    let slectedCountry = event.value;
    this.loginService.getStates().subscribe((states) => {
      this.states = states.filter(
        (state: any) => state.country_id === slectedCountry
      );
    });
  }

  register() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      // TODO: submit registration
      console.log('TODO: call registration service once api is ready');
    }
  }
}
