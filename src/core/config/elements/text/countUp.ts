import { dataConfig } from "@src/core/config/base";

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
    countUpStylePaddingLeft: 0,
    countUpStylePaddingRight: 0,
    countUpStylePaddingTop: 0,
    countUpStylePaddingBottom: 0,
    addonBefore: "",
    addonBeforeStyleFontSize: 12,
    addonBeforeStyleColor: "#fff",
    addonAfter: "",
    addonAfterStyleFontSize: 12,
    addonAfterStyleColor: "#fff",
    styleLineHeight: 40,
  },
  // 数据值
  dataValue: {
    ...dataConfig.configureValue,
    mock: {
      value: 1000.12,
    },
  },
};
