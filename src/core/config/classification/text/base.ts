import { boxConfig, fontConfig, dataConfig } from "../../base";

export const baseText = {
  // 配置名称
  code: "baseText",
  // 基础配置项
  configure: [
    ...fontConfig.configure,
    [
      {
        name: "文字阴影",
        list: [
          {
            componentName: "InputNumber",
            label: "X轴偏移",
            name: "styleTextShadowX",
            required: false,
            placeholder: "请输入X轴偏移",
          },
          {
            componentName: "InputNumber",
            label: "Y轴偏移",
            name: "styleTextShadowY",
            required: false,
            placeholder: "请输入Y轴偏移",
          },
          {
            componentName: "InputNumber",
            label: "模糊值",
            name: "styleTextShadowF",
            required: false,
            placeholder: "请输入模糊值",
          },
          {
            componentName: "SketchPicker",
            label: "颜色",
            name: "styleTextShadowC",
            required: false,
            placeholder: "请选择颜色",
          },
        ],
      },
      ...boxConfig.configure,
    ],
  ],
  data: dataConfig.configure,
};
