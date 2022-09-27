import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// configs
import { APP_ROUTES } from '@core/config/app-route.config';
// components
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {}
