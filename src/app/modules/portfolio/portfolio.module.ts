import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules
import { PortfolioRoutingModule } from './portfolio-routing.module';

// components
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [MainComponent, MapComponent],
  imports: [CommonModule, PortfolioRoutingModule],
  exports: [],
})
export class PortfolioModule {}
