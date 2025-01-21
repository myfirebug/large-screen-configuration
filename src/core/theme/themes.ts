import { themeBlue } from "./themeBlue";
import { themeGreen } from "./themeGreen";
import { themeRed } from "./themeRed";
import { themeBlack } from "./themeBlack";

type IThemes = {
  [propName in IThemeName]: {
    [propName: string]: any;
  };
};

export type IThemeName = "themeBlue" | "themeGreen" | "themeRed" | "themeBlack";

export interface IThemeItem {
  name: IThemeName;
  color: string;
  bgColor: string;
}

export const themeList: IThemeItem[] = [
  {
    name: "themeBlue",
    color: themeBlue["--cms-primary-color"],
    bgColor: themeBlue["--cms-background-color-primary"],
  },
  {
    name: "themeGreen",
    color: themeGreen["--cms-primary-color"],
    bgColor: themeGreen["--cms-background-color-primary"],
  },
  {
    name: "themeRed",
    color: themeRed["--cms-primary-color"],
    bgColor: themeRed["--cms-background-color-primary"],
  },
  {
    name: "themeBlack",
    color: themeBlack["--cms-primary-color"],
    bgColor: themeBlack["--cms-background-color-primary"],
  },
];

export const themes: IThemes = {
  themeBlue,
  themeGreen,
  themeRed,
  themeBlack,
};
