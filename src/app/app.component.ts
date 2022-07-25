import { Component } from '@angular/core';
// config
import { MENU_CONFIG } from '@core/config/menu.config';
// models
import { IMenuConfig, IMenuTree } from '@core/models/menu.model';
// utils
import { setMenuTreeData } from '@core/utils/tree-node/tree-node.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly MENU_CONFIG: IMenuConfig[] = MENU_CONFIG;
  menuTreeData: IMenuTree[];
  isMultiOpen = false;
  isThinkSidebar = true;
  showFiller = false;

  constructor() {
    this.menuTreeData = setMenuTreeData(this.MENU_CONFIG);
  }

  toggleSideBar() {
    this.isThinkSidebar = !this.isThinkSidebar;
  }
}
