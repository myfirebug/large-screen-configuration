export const pageConfig = {
  type: "page",
  label: "页面配置",
  configureValue: {
    horizontalNumber: 4,
    verticalNumber: 4,
  },
  configure: [
    [
      {
        name: "基础设置",
        list: [
          {
            componentName: "InputNumber",
            label: "横几屏",
            name: "horizontalNumber",
            required: false,
            min: 1,
            max: 6,
            placeholder: "请输入横几屏",
          },
          {
            componentName: "InputNumber",
            label: "竖几屏",
            min: 1,
            max: 6,
            name: "verticalNumber",
            required: false,
            placeholder: "请输入竖几屏",
          },
          {
            componentName: "SketchPicker",
            label: "背景颜色",
            name: "backgroundColor",
            required: false,
            placeholder: "请选择背景颜色",
          },
          {
            componentName: "Input",
            label: "背景图片",
            name: "backgroundImage",
            required: false,
            placeholder: "请输入背景图片地址",
          },
        ],
      },
    ],
  ],
};
