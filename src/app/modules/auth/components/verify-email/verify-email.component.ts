import { Component, OnInit } from '@angular/core';
// services
import { AuthFirebaseService } from '@shared/services/auth/auth-firebase.service';
// config
import { APP_ROUTES } from '@core/config/app-route.config';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  readonly APP_ROUTES = APP_ROUTES;
  constructor(public authService: AuthFirebaseService) {}

  ngOnInit(): void {}
}
