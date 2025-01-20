import React, { createContext, ReactNode, useReducer, useContext } from "react";
import { IThemeName } from "./themes";
import { ModifyActions } from "./store/action";
import { themeReducer, initialState } from "./store/reducers";

interface IThemeProvider {
  children: ReactNode;
}

export const ThemeContext = createContext<IThemeName | undefined>("themeBlue");

export const ThemeDispatchContext = createContext<
  React.Dispatch<ModifyActions>
>(() => {});

export function ThemeProvider(props: IThemeProvider) {
  const { children } = props;
  const [theme, dispatch] = useReducer(themeReducer, initialState);
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useWidget() {
  return useContext(ThemeContext);
}

export function useWidgetDispatch() {
  return useContext(ThemeDispatchContext);
}
