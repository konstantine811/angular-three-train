import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// configs
import { APP_ROUTES } from '@core/config/app-route.config';
// components
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: APP_ROUTES.dashboard.children.portfolio,
        loadChildren: () =>
          import('../portfolio/portfolio.module').then(
            (m) => m.PortfolioModule
          ),
      },
      {
        path: APP_ROUTES.dashboard.children.uiTest,
        loadChildren: () =>
          import('../ui-test/ui-test.module').then((m) => m.UiTestModule),
      },
      {
        path: APP_ROUTES.dashboard.children.map,
        loadChildren: () =>
          import('../maps/maps.module').then((m) => m.MapsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
