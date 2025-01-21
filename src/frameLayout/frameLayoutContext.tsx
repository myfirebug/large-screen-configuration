import React, { createContext, ReactNode, useReducer, useContext } from "react";
import { ModifyActions } from "./store/action";
import { frameLayoutReducer, initialState } from "./store/reducers";
import { ALL_STATE } from "./store/type";
import FrameLayout from "./index";

interface IThemeProvider {
  children: ReactNode;
}

export const FrameLayoutContext = createContext<ALL_STATE | undefined>(
  initialState
);

export const FrameLayoutDispatchContext = createContext<
  React.Dispatch<ModifyActions>
>(() => {});

export function FrameLayoutProvider(props: IThemeProvider) {
  const { children } = props;
  const [theme, dispatch] = useReducer(frameLayoutReducer, initialState);
  return (
    <FrameLayoutContext.Provider value={theme}>
      <FrameLayoutDispatchContext.Provider value={dispatch}>
        <FrameLayout>{children}</FrameLayout>
      </FrameLayoutDispatchContext.Provider>
    </FrameLayoutContext.Provider>
  );
}

export function useFrameLayout() {
  return useContext(FrameLayoutContext);
}

export function useFrameLayoutDispatch() {
  return useContext(FrameLayoutDispatchContext);
}
