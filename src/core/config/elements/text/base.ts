import { fontConfig, dataConfig, boxConfig } from "@src/core/config/base";

export const baseText: IAnyObject = {
  code: "baseText",
  // 配置项值
  configureValue: {
    styleDisplay: "block",
    styleTextShadowX: 0,
    styleTextShadowY: 0,
    styleTextShadowF: 0,
    styleTextShadowC: "",
    iconStyleFontSize: 12,
    ...boxConfig.configureValue,
    ...fontConfig.configureValue,
  },
  // 数据值
  dataValue: dataConfig.configureValue,
};
