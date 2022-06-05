import { Component } from '@angular/core';
// config
import { MENU_CONFIG } from '@core/config/menu.config';
// models
import { IMenuConfig, IMenuTree } from '@core/models/menu.model';
// utils
import { setMenuTreeData } from '@core/utils/tree-node/met-tree-node.utils';
// services
import { ThemeChangeService } from '@core/services/ui/theme-change.service';
import { THEME_TYPES } from '@core/config/theme.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly MENU_CONFIG: IMenuConfig[] = MENU_CONFIG;
  menuTreeData: IMenuTree[];
  isMultiOpen = false;

  constructor(private themeChangeService: ThemeChangeService) {
    this.menuTreeData = setMenuTreeData(this.MENU_CONFIG);
  }

  changeTheme(status: boolean) {
    if (!status) {
      this.themeChangeService.current = THEME_TYPES.dark;
    } else {
      this.themeChangeService.current = THEME_TYPES.light;
    }
  }
}
