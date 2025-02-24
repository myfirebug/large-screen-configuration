import { fontConfig } from "../../base";

export const dateText = {
  // 配置名称
  code: "dateText",
  // 基础配置项
  configure: [
    {
      componentName: "Input",
      label: "自定义格式",
      name: "fmtDate",
      required: false,
      placeholder: "",
    },
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
            addonAfter: "px",
          },
          {
            componentName: "InputNumber",
            label: "Y轴偏移",
            name: "styleTextShadowY",
            required: false,
            placeholder: "请输入Y轴偏移",
            addonAfter: "px",
          },
          {
            componentName: "InputNumber",
            label: "模糊值",
            name: "styleTextShadowF",
            required: false,
            placeholder: "请输入模糊值",
            addonAfter: "px",
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
    ],
  ],
};
