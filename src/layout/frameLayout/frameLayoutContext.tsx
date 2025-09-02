import React, { createContext, ReactNode, useReducer, useContext } from "react";
import { ModifyActions } from "./store/action";
import { frameLayoutReducer, initialState } from "./store/reducers";
import { useTheme } from "@core/theme/themeContext";
import { ALL_STATE } from "./store/type";
import FrameLayout from "./index";
import { ConfigProvider, theme } from "antd";
import { getCurrentPrimaryColor, IThemeName } from "@core/theme";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import en_US from "antd/locale/en_US";
import { LocaleProvider } from "@src/core/i18n/localeContent";
import { LOCAL_NAME } from "@src/core/enums/access.enums";
import { localStorage } from "@src/utils";
dayjs.locale("zh-cn");

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
  const [layout, dispatch] = useReducer(frameLayoutReducer, initialState);

  const currentTheme = useTheme();
  return (
    <LocaleProvider locale={localStorage.get(LOCAL_NAME) || "en_US"}>
      <ConfigProvider
        locale={localStorage.get(LOCAL_NAME) === "en_US" ? en_US : zhCN}
        theme={{
          token: {
            colorPrimary: getCurrentPrimaryColor(currentTheme as IThemeName),
            colorBgContainer: "var(--cms-background-color-primary)",
            colorBorder: "var(--cms-divider-color)",
            colorIcon: "var(--cms-divider-color)",
            colorIconHover: "var(--cms-primary-color)",
            colorTextPlaceholder: "var(--cms-divider-color)",
            colorText: "var(--cms-text-color-secondary)",
            controlOutline: "var(--cms-secondary-color)",
            colorErrorOutline: "#ff4d4f",
            colorBorderSecondary: "var(--cms-divider-color)",
            colorBgElevated: "var(--cms-background-color-primary)",
            colorBgSpotlight: "var(--cms-background-color-secondary)",
            colorLinkHover: "var(--cms-secondary-color)",
            controlItemBgActive: "var(--cms-background-color-secondary)",
          },
          algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <FrameLayoutContext.Provider value={layout}>
          <FrameLayoutDispatchContext.Provider value={dispatch}>
            <FrameLayout>{children}</FrameLayout>
          </FrameLayoutDispatchContext.Provider>
        </FrameLayoutContext.Provider>
      </ConfigProvider>
    </LocaleProvider>
  );
}

export function useFrameLayout() {
  return useContext(FrameLayoutContext);
}

export function useFrameLayoutDispatch() {
  return useContext(FrameLayoutDispatchContext);
}
