import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// configs
import { APP_ROUTES } from '@core/config/app-route.config';
// components
import { UiTestComponent } from './components/ui-test/ui-test.component';

const routes: Routes = [
  {
    path: '',
    component: UiTestComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UITestRoutingModule {}
