import { theme01 } from "./theme01";
import { theme02 } from "./theme02";
import { theme03 } from "./theme03";
import { theme04 } from "./theme04";

type IThemes = {
  [propName in IThemeName]: {
    [propName: string]: any;
  };
};

export type IThemeName = "theme01" | "theme02" | "theme03" | "theme04";

export const themeList: IThemeName[] = [
  "theme01",
  "theme02",
  "theme03",
  "theme04",
];

export const themes: IThemes = { theme01, theme02, theme03, theme04 };
