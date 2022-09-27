import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
// config
import {
  ThemeNames,
  THEME_TYPES,
  THEME_COLOR_NAMES,
} from '@core/config/theme.config';
// models
import { ICurrentColorEntity, IColorData } from '@core/models/theme.model';
// utils
import { parseHexColorToNumber } from '@core/utils/color/parse-color';

@Injectable({
  providedIn: 'root',
})
export class ThemeChangeService {
  private readonly defaultTheme = THEME_TYPES.dark;
  private readonly themeLocalName = 'theme';
  private themeColors: ICurrentColorEntity = {} as any;
  private _currentMainColor$ = new ReplaySubject<IColorData>(1);

  get current(): ThemeNames {
    return (
      (localStorage.getItem(this.themeLocalName) as ThemeNames) ??
      this.defaultTheme
    );
  }

  get currentMainColor$(): Observable<IColorData> {
    return this._currentMainColor$;
  }

  set current(value: ThemeNames) {
    this._currentMainColor$.next(this.themeColors[value]);
    const currentThemeClass = localStorage.getItem(this.themeLocalName);
    if (currentThemeClass) {
      document.body.classList.remove(currentThemeClass);
    }
    localStorage.setItem(this.themeLocalName, value);
    document.body.classList.add(value);
  }

  constructor() {}

  init() {
    const currentThemeClass = localStorage.getItem(this.themeLocalName);
    if (!currentThemeClass) {
      document.body.classList.add(this.defaultTheme);
    } else {
      document.body.classList.add(currentThemeClass);
    }
    this.getGlobalColors();
  }

  getGlobalColors() {
    THEME_COLOR_NAMES.forEach((item) => {
      const color = getComputedStyle(document.documentElement).getPropertyValue(
        `--${item.color}`
      );
      this.themeColors[item.themeName] = {
        hex: color,
        hexNumber: parseHexColorToNumber(color),
      };
    });
  }
}
