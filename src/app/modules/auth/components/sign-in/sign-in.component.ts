import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// services
import { AuthFirebaseService } from '@shared/services/auth/auth-firebase.service';
// config
import { APP_ROUTES } from '@core/config/app-route.config';
import { VALIDATION_REGX } from '@core/config/validataion.config';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(VALIDATION_REGX.email),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  loginErrorMessage = '';
  readonly APP_ROUTES = APP_ROUTES;
  constructor(private authFirebaseService: AuthFirebaseService) {}

  async onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.loginErrorMessage = await this.authFirebaseService.signIn(
        email,
        password
      );
    }
  }

  ngOnInit(): void {}
}
