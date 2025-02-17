import { dataConfig, boxConfig } from "@src/core/config/base";

export const messageText: IAnyObject = {
  code: "messageText",
  // 配置项值
  configureValue: {
    styleTextShadowX: 0,
    styleTextShadowY: 0,
    styleTextShadowF: 0,
    styleTextShadowC: "",
    iconStyleFontSize: 14,
    iconStyleColor: "rgba(255,255,255,.5)",
    ...boxConfig.configureValue,
    styleBackgroundColor: "rgba(255,255,255,.1)",
    styleFontSize: 14,
    styleLineHeight: 36,
    styleFontFamily: "Microsoft YaHei",
    styleFontWeight: "normal",
    stylePaddingLeft: 5,
    stylePaddingRight: 5,
    styleBorderTopRightRadius: 5,
    styleBorderTopLeftRadius: 5,
    styleBorderBottomRightRadius: 5,
    styleBorderBottomLeftRadius: 5,
  },
  // 数据值
  dataValue: {
    ...dataConfig.configureValue,
    mock: {
      value: "我是滚动文本",
    },
  },
};
