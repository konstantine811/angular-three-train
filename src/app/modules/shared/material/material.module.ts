import { NgModule } from '@angular/core';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatRippleModule],
  exports: [MatButtonModule, MatRippleModule],
})
export class MaterialModule {}
