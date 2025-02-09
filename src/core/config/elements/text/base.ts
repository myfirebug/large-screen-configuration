import { fontConfig, dataConfig, boxConfig } from "@src/core/config/base";

export const baseText: IAnyObject = {
  code: "elementBaseText",
  type: "text",
  name: "基础文本框",
  // 配置项值
  configureValue: {
    styleDisplay: "block",
    styleTextShadowX: 0,
    styleTextShadowY: 0,
    styleTextShadowF: 0,
    styleTextShadowC: "",
    ...boxConfig.configureValue,
    ...fontConfig.configureValue,
  },
  // 数据值
  dataValue: dataConfig.configureValue,
};
