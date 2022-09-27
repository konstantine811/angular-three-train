import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { MatIconModule } from '@angular/material/icon';
// shared components
import { TreeNodeComponent } from './components/ui/tree-node/tree-node.component';
import { SwitcherThemeComponent } from './components/ui/switcher/switcher-theme.component';
import { InputComponent } from './components/ui/input/input.component';
// directives
import { RippleDirective } from './directives/ripple.directive';

@NgModule({
  declarations: [
    TreeNodeComponent,
    SwitcherThemeComponent,
    RippleDirective,
    InputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule,
  ],
  exports: [
    MaterialModule,
    TreeNodeComponent,
    SwitcherThemeComponent,
    RippleDirective,
    MatIconModule,
    InputComponent,
  ],
})
export class SharedModule {}
