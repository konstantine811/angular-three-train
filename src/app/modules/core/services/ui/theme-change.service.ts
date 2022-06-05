import { Injectable } from '@angular/core';
// config
import { THEME_TYPES } from '@core/config/theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeChangeService {
  static defaultTheme = THEME_TYPES.dark;
  private readonly themeLocalName = 'theme';
  private readonly style: HTMLLinkElement;

  get current(): THEME_TYPES {
    return (
      (localStorage.getItem(this.themeLocalName) as THEME_TYPES) ??
      ThemeChangeService.defaultTheme
    );
  }

  set current(value: THEME_TYPES) {
    localStorage.setItem(this.themeLocalName, value);
    this.style.href = `/${value}.css`;
  }

  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);

    if (localStorage.getItem(this.themeLocalName) !== undefined) {
      this.style.href = `/${this.current}.css`;
    }
  }
}
