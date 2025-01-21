import { themeBlue } from "./themeBlue";
import { themeGreen } from "./themeGreen";

type IThemes = {
  [propName in IThemeName]: {
    [propName: string]: any;
  };
};

export type IThemeName = "themeBlue" | "themeGreen";

export interface IThemeItem {
  name: IThemeName;
  color: string;
}

export const themeList: IThemeItem[] = [
  {
    name: "themeBlue",
    color: themeBlue["--cms-primary-color"],
  },
  {
    name: "themeGreen",
    color: themeGreen["--cms-primary-color"],
  },
];

export const themes: IThemes = {
  themeBlue,
  themeGreen,
};
