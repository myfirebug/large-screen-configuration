import { boxConfig } from "./box";
import { dataConfig } from "./data";

export const widgetConfig = {
  configureValue: {
    ...boxConfig.configureValue,
    styleBoxShadowX: 0,
    styleBoxShadowY: 0,
    styleBoxShadowF: 10,
    styleBoxShadowC: "#000",
    styleBorderStyle: "solid",
    styleBorderWidth: 1,
    styleBorderColor: "#000",
    styleBorderTopLeftRadius: 10,
    styleBorderTopRightRadius: 10,
    styleBorderBottomLeftRadius: 10,
    styleBorderBottomRightRadius: 10,
    styleBackgroundColor: "#000",
  },
  configure: [
    {
      componentName: "Input",
      label: "背景图",
      name: "styleBackgroundUrl",
      required: false,
      placeholder: "请输入背景图地址",
    },
    {
      componentName: "SketchPicker",
      label: "背景颜色",
      name: "styleBackgroundColor",
      required: false,
      placeholder: "",
    },
    [
      ...boxConfig.configure,
      {
        name: "头部",
        list: [
          {
            componentName: "Input",
            label: "背景图",
            name: "headerStyleBackgroundUrl",
            required: false,
            placeholder: "请输入背景图地址",
          },
          {
            componentName: "SketchPicker",
            label: "背景颜色",
            name: "headerStyleBackgroundColor",
            required: false,
            placeholder: "",
          },
        ],
      },
      {
        name: "主体",
        list: [
          {
            componentName: "Input",
            label: "背景图",
            name: "bodyStyleBackgroundUrl",
            required: false,
            placeholder: "请输入背景图地址",
          },
          {
            componentName: "SketchPicker",
            label: "背景颜色",
            name: "bodyStyleBackgroundColor",
            required: false,
            placeholder: "",
          },
        ],
      },
    ],
  ],
  dataValue: dataConfig.configureValue,
};
