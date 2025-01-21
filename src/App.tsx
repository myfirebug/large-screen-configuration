import React, { Suspense } from "react";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider, useTheme } from "@core/theme/themeContext";
import { getCurrentPrimaryColor, IThemeName } from "@core/theme";
import { FrameLayoutProvider } from "./frameLayout/frameLayoutContext";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "@src/assets/scss/base/normalize.css";
import Routes from "./router";

dayjs.locale("zh-cn");

function App() {
  const currentTheme = useTheme();
  return (
    <ThemeProvider>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: getCurrentPrimaryColor(currentTheme as IThemeName),
          },
          // 1. 单独使用暗色算法
          algorithm: theme.defaultAlgorithm,
          // 2. 组合使用暗色算法与紧凑算法
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <FrameLayoutProvider>
          <Suspense>
            <Routes />
          </Suspense>
        </FrameLayoutProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
