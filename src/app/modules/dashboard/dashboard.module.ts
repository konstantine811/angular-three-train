import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// modules
import { CoreModule } from '@core/core.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
// components
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, CoreModule, RouterModule, DashboardRoutingModule],
  exports: [],
})
export class DashboardModule {}
