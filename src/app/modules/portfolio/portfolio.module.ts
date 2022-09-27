import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules
import { PortfolioRoutingModule } from './portfolio-routing.module';

// components
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, PortfolioRoutingModule],
  exports: [MainComponent],
})
export class PortfolioModule {}
