import { fontConfig } from "@src/core/config/base";

export const dateText: IAnyObject = {
  code: "dateText",
  // 配置项值
  configureValue: {
    fmtDate: "yyyy-MM-dd hh:mm:ss",
    iconStyleFontSize: 12,
    ...fontConfig.configureValue,
  },
};
