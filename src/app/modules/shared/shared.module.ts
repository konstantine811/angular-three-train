import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared components
import { TreeNodeComponent } from './components/tree-node/tree-node.component';

@NgModule({
  declarations: [TreeNodeComponent],
  imports: [CommonModule],
  exports: [TreeNodeComponent],
})
export class SharedModule {}
