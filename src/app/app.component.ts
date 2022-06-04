import { Component } from '@angular/core';
// config
import { MENU_CONFIG } from '@core/config/menu.config';
// models
import { IMenuConfig, IMenuTree } from '@core/models/menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly MENU_CONFIG: IMenuConfig[] = MENU_CONFIG;
  menuTreeData: IMenuTree[];

  constructor() {
    this.menuTreeData = this.setMenuTreeData(this.MENU_CONFIG);
  }

  setMenuTreeData(data: IMenuConfig[], level = 0): IMenuTree[] {
    return data.map((item) => {
      const treeItem = {
        ...item,
        isOpen: false,
        level,
      };
      if (treeItem.children) {
        treeItem.children = this.setMenuTreeData(
          treeItem.children,
          treeItem.level + 1
        );
      }
      return treeItem as IMenuTree;
    });
  }
}
