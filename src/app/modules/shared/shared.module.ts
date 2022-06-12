import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
// shared components
import { TreeNodeComponent } from './components/ui/tree-node/tree-node.component';
import { SwitcherThemeComponent } from './components/ui/switcher/switcher-theme.component';

@NgModule({
  declarations: [TreeNodeComponent, SwitcherThemeComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [MaterialModule, TreeNodeComponent, SwitcherThemeComponent],
})
export class SharedModule {}
