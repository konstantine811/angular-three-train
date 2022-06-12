import { Injectable } from '@angular/core';
// config
import { ThemeNames, THEME_TYPES } from '@core/config/theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeChangeService {
  private readonly defaultTheme = THEME_TYPES.dark;
  private readonly themeLocalName = 'theme';

  get current(): ThemeNames {
    return (
      (localStorage.getItem(this.themeLocalName) as ThemeNames) ??
      this.defaultTheme
    );
  }

  set current(value: ThemeNames) {
    const currentThemeClass = localStorage.getItem(this.themeLocalName);
    if (currentThemeClass) {
      document.body.classList.remove(currentThemeClass);
    }
    localStorage.setItem(this.themeLocalName, value);
    document.body.classList.add(value);
  }

  constructor() {
    const currentThemeClass = localStorage.getItem(this.themeLocalName);
    if (!currentThemeClass) {
      document.body.classList.add(this.defaultTheme);
    } else {
      document.body.classList.add(currentThemeClass);
    }
  }
}
