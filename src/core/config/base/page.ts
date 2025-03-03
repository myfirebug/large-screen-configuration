export const pageConfig = {
  type: "page",
  label: "页面配置",
  configureValue: {
    pageWidth: 1366,
    pageHeight: 768,
    horizontalNumber: 4,
    verticalNumber: 3,
    pageBackgroundColor: "#090548",
  },
  configure: [
    [
      {
        name: "基础设置",
        list: [
          {
            componentName: "InputNumber",
            label: "宽度",
            name: "pageWidth",
            required: false,
            min: 1366,
            max: 5000,
            placeholder: "请输入宽度",
          },
          {
            componentName: "InputNumber",
            label: "高度",
            name: "pageHeight",
            required: false,
            min: 768,
            max: 3000,
            placeholder: "请输入高度",
          },
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
            name: "pageBackgroundColor",
            required: false,
            placeholder: "请选择背景颜色",
          },
          {
            componentName: "Input",
            label: "背景图片",
            name: "PageBackgroundImage",
            required: false,
            placeholder: "请输入背景图片地址",
          },
        ],
      },
    ],
  ],
};
