import { font, data, box } from "@src/core/config/base";

export const baseText = {
  code: "elementBaseText",
  type: "text",
  label: "基础文本",
  // 配置项值
  configureValue: {
    styleDisplay: "block",
    styleTextShadowX: 0,
    styleTextShadowY: 0,
    styleTextShadowF: 0,
    styleTextShadowC: "",
    ...box.configureValue,
    ...font.configureValue,
  },
  // 坐标值
  coordinateValue: {
    left: 0,
    top: 0,
    width: 100,
    height: 40,
  },
  // 数据值
  dataValue: data.configureValue,
};
