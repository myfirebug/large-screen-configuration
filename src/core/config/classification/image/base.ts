import { boxConfig, dataConfig } from "../../base";

export const baseImage = {
  // 配置名称
  code: "baseImage",
  // 基础配置项
  configure: [
    [
      {
        name: "基础设置",
        list: [[...boxConfig.configure]],
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
  data: dataConfig.configure,
};
