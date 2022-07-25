import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// configs
import { APP_ROUTES } from '@core/config/app-route.config';
// components
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  {
    path: APP_ROUTES.main.children.portfolio,
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.main.children.map,
    component: MapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {}
