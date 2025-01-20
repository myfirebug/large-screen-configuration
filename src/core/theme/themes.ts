import { themeBlue } from "./themeBlue";

type IThemes = {
  [propName in IThemeName]: {
    [propName: string]: any;
  };
};

export type IThemeName = "themeBlue";

export interface IThemeItem {
  name: IThemeName;
  color: string;
}

export const themeList: IThemeItem[] = [
  {
    name: "themeBlue",
    color: themeBlue["--cms-primary-color"],
  },
];

export const themes: IThemes = {
  themeBlue,
};
