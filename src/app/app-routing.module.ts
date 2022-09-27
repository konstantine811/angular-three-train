import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// configs
import { APP_ROUTES } from '@core/config/app-route.config';
// guards
import { AuthGuardService } from '@shared/services/auth/guard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: APP_ROUTES.auth.name, pathMatch: 'full' },
  {
    path: APP_ROUTES.dashboard.name,
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: APP_ROUTES.auth.name,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
