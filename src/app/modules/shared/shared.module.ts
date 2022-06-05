import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// shared components
import { TreeNodeComponent } from './components/ui/tree-node/tree-node.component';
import { SwitcherComponent } from './components/ui/switcher/switcher.component';

@NgModule({
  declarations: [TreeNodeComponent, SwitcherComponent],
  imports: [CommonModule, FormsModule],
  exports: [TreeNodeComponent, SwitcherComponent],
})
export class SharedModule {}
