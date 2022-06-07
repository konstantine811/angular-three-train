import { Component, OnInit } from '@angular/core';
// config
import { THEME_TYPES } from '@core/config/theme.config';
// services
import { ThemeChangeService } from '@core/services/ui/theme-change.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  constructor(private themeChangeService: ThemeChangeService) {}

  changeTheme(status: boolean) {
    if (!status) {
      this.themeChangeService.current = THEME_TYPES.dark;
    } else {
      this.themeChangeService.current = THEME_TYPES.light;
    }
  }

  ngOnInit(): void {}
}
