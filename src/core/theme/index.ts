import { themes, IThemeName } from "./themes";
import cssVars from "css-vars-ponyfill";
export * from "./themes";
export function setTheme(theme: IThemeName) {
  document.documentElement.setAttribute("data-theme", theme);
  cssVars({
    watch: true,
    variables: themes[theme],
    onlyLegacy: false,
  });
}
