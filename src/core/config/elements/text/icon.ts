import { fontConfig, dataConfig, boxConfig } from "@src/core/config/base";

export const iconText: IAnyObject = {
  code: "iconText",
  // 配置项值
  configureValue: {
    iconStyleFontSize: 12,
    iconStyleSelect: "&#xe62e",
    ...boxConfig.configureValue,
    ...fontConfig.configureValue,
  },
  // 数据值
  dataValue: dataConfig.configureValue,
};
