import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app modules
import { UITestRoutingModule } from './ui-test-routing.module';
// components
import { UiTestComponent } from './components/ui-test/ui-test.component';

@NgModule({
  declarations: [UiTestComponent],
  imports: [CommonModule, UITestRoutingModule],
})
export class UiTestModule {}
