import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// configs
import { APP_ROUTES } from '@core/config/app-route.config';
// components
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: APP_ROUTES.auth.children.signUp, pathMatch: 'full' },
  {
    path: APP_ROUTES.auth.children.signUp,
    component: SignUpComponent,
  },
  {
    path: APP_ROUTES.auth.children.signIn,
    component: SignInComponent,
  },
  {
    path: APP_ROUTES.auth.children.verifyEmail,
    component: VerifyEmailComponent,
  },
  {
    path: APP_ROUTES.auth.children.forgotPassword,
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
