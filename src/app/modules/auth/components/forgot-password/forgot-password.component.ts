import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// services
import { AuthFirebaseService } from '@shared/services/auth/auth-firebase.service';
// config
import { VALIDATION_REGX } from '@core/config/validataion.config';
// models
import { IFormMessage } from '@core/models/auth-form.model';
import { APP_ROUTES } from '@core/config/app-route.config';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(VALIDATION_REGX.email),
    ]),
  });
  resetErrorMessage!: IFormMessage;
  readonly APP_ROUTES = APP_ROUTES;

  constructor(private authFirebaseService: AuthFirebaseService) {}

  async onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { email } = this.resetPasswordForm.value;
      this.resetErrorMessage = await this.authFirebaseService.forgotPassoword(
        email
      );
    }
  }

  ngOnInit(): void {}
}
