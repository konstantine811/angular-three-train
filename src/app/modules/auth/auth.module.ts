import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// modules
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
// components
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [SignUpComponent, VerifyEmailComponent, SignInComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class AuthModule {}
