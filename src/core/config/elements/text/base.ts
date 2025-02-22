import { fontConfig, dataConfig, boxConfig } from "@src/core/config/base";

export const baseText: IAnyObject = {
  code: "baseText",
  // 配置项值
  configureValue: {
    iconStyleFontSize: 12,
    ...boxConfig.configureValue,
    ...fontConfig.configureValue,
  },
  // 数据值
  dataValue: dataConfig.configureValue,
};
