import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthFirebaseService } from '@shared/services/auth/auth-firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private authFirebaseService: AuthFirebaseService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authFirebaseService.isLoggedIn) {
      this.router.navigate(['sign-up']);
    }
    return true;
  }
}
