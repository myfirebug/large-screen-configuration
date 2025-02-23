import { elementDataConfig } from "@src/core/config/base";

export const countUp: IAnyObject = {
  code: "countUp",
  // 配置项值
  configureValue: {
    styleJustifyContent: "center",
    styleAlignItems: "center",
    countUpStyleFontSize: 20,
    countUpStyleColor: "#fff",
    countUpStyleFontFamily: "Microsoft YaHei",
    countUpStyleFontWeight: "bolder",
    addonBeforeStyleFontSize: 12,
    addonBeforeStyleColor: "#fff",
    addonAfterStyleFontSize: 12,
    addonAfterStyleColor: "#fff",
    styleLineHeight: 40,
  },
  // 数据值
  dataValue: {
    ...elementDataConfig.configureValue,
    mock: {
      value: 1000.12,
    },
  },
};
