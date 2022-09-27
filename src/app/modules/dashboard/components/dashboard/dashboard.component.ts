import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from '@core/config/app-route.config';
// config
import { MENU_CONFIG } from '@core/config/menu.config';
// models
import { IMenuConfig, IMenuTree } from '@core/models/menu.model';
// utils
import { setMenuTreeData } from '@core/utils/tree-node/tree-node.utils';
import { AuthFirebaseService } from '@shared/services/auth/auth-firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  readonly MENU_CONFIG: IMenuConfig[] = MENU_CONFIG;
  menuTreeData: IMenuTree[];
  isMultiOpen = false;
  isThinkSidebar = true;
  showFiller = false;
  readonly APP_ROUTES = APP_ROUTES;

  constructor(private authService: AuthFirebaseService) {
    this.menuTreeData = setMenuTreeData(this.MENU_CONFIG);
    this.authService.getUserData();
  }

  toggleSideBar() {
    this.isThinkSidebar = !this.isThinkSidebar;
  }

  onSignOut() {
    this.authService.signOut();
  }

  ngOnInit(): void {}
}
