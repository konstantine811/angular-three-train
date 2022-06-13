import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
// shared components
import { TreeNodeComponent } from './components/ui/tree-node/tree-node.component';
import { SwitcherThemeComponent } from './components/ui/switcher/switcher-theme.component';
// directives
import { RippleDirective } from './directives/ripple.directive';

@NgModule({
  declarations: [TreeNodeComponent, SwitcherThemeComponent, RippleDirective],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [
    MaterialModule,
    TreeNodeComponent,
    SwitcherThemeComponent,
    RippleDirective,
  ],
})
export class SharedModule {}
