import { Component, Input, OnInit } from '@angular/core';
import { THEME_TYPES } from '@core/config/theme.config';
import { ThemeChangeService } from '@core/services/ui/theme-change.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  @Input() isThink!: boolean;
  isCheckedTheme = false;

  constructor(private themeChangeService: ThemeChangeService) {}

  onSwitchChange(isChecked: boolean) {
    if (isChecked) {
      this.themeChangeService.current = THEME_TYPES.light;
    } else {
      this.themeChangeService.current = THEME_TYPES.dark;
    }
  }

  ngOnInit(): void {
    this.isCheckedTheme = this.themeChangeService.current === THEME_TYPES.light;
  }
}
