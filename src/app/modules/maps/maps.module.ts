import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app modules
import { MapsRoutingModule } from './maps-routing.module';
// components
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, MapsRoutingModule],
})
export class MapsModule {}
