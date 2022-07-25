import { ThemeNames } from '@core/config/theme.config';

export interface IColorThemeData {
  color: string;
  themeName: ThemeNames;
}

export type ICurrentColorEntity = {
  [key in ThemeNames]: IColorData;
};

export interface IColorData {
  hex: string;
  hexNumber: number;
}
