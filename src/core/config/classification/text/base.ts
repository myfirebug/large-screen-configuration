import { boxConfig, fontConfig } from "../../base";

export const baseText = {
  // 配置名称
  code: "baseText",
  // 基础配置项
  configure: [
    [
      {
        name: "基础设置",
        list: [
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
            ...boxConfig.configure,
          ],
        ],
      },
      {
        name: "icon图标",
        list: [
          {
            componentName: "Select",
            label: "图标",
            name: "iconStyleSelect",
            required: false,
            placeholder: "",
            options: [
              { code: "&#xe621", name: "&#xe621" },
              { code: "&#xe62e", name: "&#xe62e" },
              { code: "&#xeb04", name: "&#xeb04" },
              { code: "&#xec89", name: "&#xec89" },
              { code: "&#xe668", name: "&#xe668" },
              { code: "&#xe620", name: "&#xe620" },
              { code: "&#xe652", name: "&#xe652" },
              { code: "&#xe63d", name: "&#xe63d" },
              { code: "&#xe65a", name: "&#xe65a" },
              { code: "&#xe7de", name: "&#xe7de" },
              { code: "&#xe7b0", name: "&#xe7b0" },
              { code: "&#xe7b1", name: "&#xe7b1" },
            ],
          },
          {
            componentName: "InputNumber",
            label: "字体大小",
            name: "iconStyleFontSize",
            required: false,
            min: 12,
            placeholder: "",
            addonAfter: "px",
          },
          {
            componentName: "SketchPicker",
            label: "字体颜色",
            name: "iconStyleColor",
            required: false,
            placeholder: "请选择字体颜色",
          },
        ],
      },
    ],
  ],
};
