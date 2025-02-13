import { boxConfig } from "./box";
import { dataConfig } from "./data";

export const widgetConfig = {
  configureValue: {
    ...boxConfig.configureValue,
    styleBoxShadowX: 0,
    styleBoxShadowY: 0,
    styleBoxShadowF: 10,
    styleBoxShadowC: "rgba(15, 32, 212, 0.5)",
    styleBorderStyle: "solid",
    styleBorderWidth: 1,
    styleBorderColor: "rgb(15, 32, 212)",
    styleBorderTopLeftRadius: 10,
    styleBorderTopRightRadius: 10,
    styleBorderBottomLeftRadius: 10,
    styleBorderBottomRightRadius: 10,
    styleBackgroundColor: "#090548",
    styleBackgroundImage: "",
    headerStyleBackgroundImage: "",
    headerStyleBackgroundColor: "",
    bodyStyleBackgroundImage: "",
    bodyStyleBackgroundColor: "",
    headerStyleHeight: 40,
    isShowAuxiliaryLine: true,
    auxiliaryLineBorderColor: "rgba(255, 255, 255, 0.2)",
    headerStyleBorderBottomColor: "rgb(15, 32, 212)",
    bodyStylePaddingTop: 4,
  },
  configure: [
    [
      {
        name: "基础配置",
        list: [
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
          [
            {
              name: "内边距",
              list: [
                {
                  componentName: "InputNumber",
                  label: "左边距",
                  name: "bodyStylePaddingLeft",
                  required: false,
                  placeholder: "请输入左边距",
                  addonAfter: "px",
                },
                {
                  componentName: "InputNumber",
                  label: "右边距",
                  name: "bodyStylePaddingRight",
                  required: false,
                  placeholder: "请输入右边距",
                  addonAfter: "px",
                },
                {
                  componentName: "InputNumber",
                  label: "上边距",
                  name: "bodyStylePaddingTop",
                  required: false,
                  placeholder: "请输入上边距",
                  addonAfter: "px",
                },
                {
                  componentName: "InputNumber",
                  label: "下边距",
                  name: "bodyStylePaddingBottom",
                  required: false,
                  placeholder: "请输入下边距",
                  addonAfter: "px",
                },
              ],
            },
          ],
        ],
      },
      {
        name: "辅助线",
        list: [
          {
            componentName: "Switch",
            label: "是否显示",
            name: "isShowAuxiliaryLine",
            required: false,
            placeholder: "",
          },
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
  dataValue: dataConfig.configureValue,
};
