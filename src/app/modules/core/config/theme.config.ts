import { IColorThemeData } from '@core/models/theme.model';

export enum ThemeNames {
  light = 'light-theme',
  dark = 'dark-theme',
}

enum ColorNames {
  light = 'light',
  dark = 'dark',
}

export const THEME_TYPES = {
  light: ThemeNames.light,
  dark: ThemeNames.dark,
};

export const THEME_COLOR_NAMES: IColorThemeData[] = [
  {
    color: ColorNames.light,
    themeName: ThemeNames.light,
  },
  {
    color: ColorNames.dark,
    themeName: ThemeNames.dark,
  },
];
