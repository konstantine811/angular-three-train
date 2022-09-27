import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// configs
import { APP_ROUTES } from '@core/config/app-route.config';
// components
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule {}
