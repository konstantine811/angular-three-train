import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// own modules
import { SharedModule } from '../shared/shared.module';
// shared components
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [SidebarMenuComponent, HeaderComponent],
  imports: [CommonModule, SharedModule],
  exports: [SidebarMenuComponent],
})
export class CoreModule {}
