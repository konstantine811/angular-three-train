import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// helpers
import { confirmedValidator } from '../../providers/validators';
// services
import { AuthFirebaseService } from '@shared/services/auth/auth-firebase.service';
// config
import { APP_ROUTES } from '@core/config/app-route.config';
import { VALIDATION_REGX } from '@core/config/validataion.config';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(VALIDATION_REGX.email),
      ]),
      nickName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: confirmedValidator('password', 'confirmPassword'),
    }
  );
  readonly APP_ROUTES = APP_ROUTES;

  constructor(private authFirebaseService: AuthFirebaseService) {}

  onSubmit() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.authFirebaseService.signUp(email, password);
    }
  }

  ngOnInit(): void {}
}
