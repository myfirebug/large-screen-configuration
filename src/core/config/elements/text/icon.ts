import { fontConfig, dataConfig, boxConfig } from "@src/core/config/base";

export const iconText: IAnyObject = {
  code: "iconText",
  // 配置项值
  configureValue: {
    styleDisplay: "block",
    styleTextShadowX: 0,
    styleTextShadowY: 0,
    styleTextShadowF: 0,
    styleTextShadowC: "",
    iconStyleFontSize: 12,
    iconStyleSelect: "&#xe62e",
    ...boxConfig.configureValue,
    ...fontConfig.configureValue,
  },
  // 数据值
  dataValue: dataConfig.configureValue,
};
