import { boxConfig } from "./box";
import { widgetDataConfig } from "./widgetData";

export const widgetConfig = {
  configureValue: {
    ...boxConfig.configureValue,
    styleBoxShadowC: "rgba(15, 32, 212, 0.5)",
    styleBorderStyle: "solid",
    styleBorderWidth: 1,
    styleBorderColor: "rgb(15, 32, 212)",
    styleBorderTopLeftRadius: 10,
    styleBorderTopRightRadius: 10,
    styleBorderBottomLeftRadius: 10,
    styleBorderBottomRightRadius: 10,
    styleBackgroundColor: "#090548",
    headerStyleHeight: 40,
    isShowAuxiliaryLine: true,
    auxiliaryLineBorderColor: "rgba(255, 255, 255, 0.2)",
    headerStyleBorderBottomColor: "rgb(15, 32, 212)",
    headerShow: true,
    bodyShow: true,
    widgetConfigWidth: 600,
    widgetConfigHeight: 400,
  },
  configure: [
    [
      {
        name: "基础配置",
        list: [
          {
            componentName: "InputNumber",
            label: "宽度",
            name: "widgetConfigWidth",
            required: false,
            min: 160,
            max: 1000,
            tooltip: "只有配置页面有用，预览页面是全屏",
            placeholder: "请输入宽度",
          },
          {
            componentName: "InputNumber",
            label: "高度",
            name: "widgetConfigHeight",
            required: false,
            min: 100,
            max: 600,
            tooltip: "只有配置页面有用，预览页面是全屏",
            placeholder: "请输入高度",
          },
          {
            componentName: "Input",
            label: "背景图",
            name: "styleBackgroundImage",
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
          boxConfig.configure,
        ],
      },
    ],
    [
      {
        name: "头部",
        list: [
          {
            componentName: "Switch",
            label: "是否显示",
            name: "headerShow",
            required: false,
            placeholder: "",
          },
          {
            componentName: "Input",
            label: "背景图",
            name: "headerStyleBackgroundImage",
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
          {
            componentName: "InputNumber",
            label: "高度",
            name: "headerStyleHeight",
            required: false,
            placeholder: "请输入高度",
            addonAfter: "px",
          },
          {
            componentName: "SketchPicker",
            label: "下边框颜色",
            name: "headerStyleBorderBottomColor",
            required: false,
            placeholder: "",
          },
        ],
      },
      {
        name: "主体",
        list: [
          {
            componentName: "Switch",
            label: "是否显示",
            name: "bodyShow",
            required: false,
            placeholder: "",
          },
          {
            componentName: "Input",
            label: "背景图",
            name: "bodyStyleBackgroundImage",
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
      {
        name: "辅助线",
        list: [
          {
            componentName: "SketchPicker",
            label: "边框颜色",
            name: "auxiliaryLineBorderColor",
            required: false,
            placeholder: "",
          },
        ],
      },
    ],
  ],
  dataValue: widgetDataConfig.configureValue,
};
