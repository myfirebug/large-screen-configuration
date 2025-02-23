import { boxConfig } from "../../base";

export const messageText = {
  // 配置名称
  code: "messageText",
  // 基础配置项
  configure: [
    [
      {
        name: "基础设置",
        list: [
          {
            componentName: "SketchPicker",
            label: "背景颜色",
            name: "styleBackgroundColor",
            required: false,
            placeholder: "",
          },
          {
            componentName: "InputNumber",
            label: "字体大小",
            name: "styleFontSize",
            required: false,
            min: 12,
            placeholder: "",
            addonAfter: "px",
          },
          {
            componentName: "InputNumber",
            label: "行高",
            name: "styleLineHeight",
            required: false,
            placeholder: "",
            addonAfter: "px",
          },
          {
            componentName: "Select",
            label: "字体样式",
            name: "styleFontFamily",
            required: false,
            placeholder: "",
            options: [
              { code: "SimSun", name: "宋体" },
              { code: "KaiTi", name: "楷体" },
              { code: "Microsoft YaHei", name: "微软雅黑" },
              { code: "STHeiti", name: "华文黑体" },
              { code: "arial", name: "无衬线体" },
              { code: "serif", name: "有衬线体" },
              { code: "cursive", name: "草书" },
              { code: "monospace", name: "等宽字体" },
              { code: "courier", name: "打印字体" },
            ],
          },
          {
            componentName: "Select",
            label: "文字粗细",
            name: "styleFontWeight",
            required: false,
            placeholder: "",
            options: [
              { code: "normal", name: "正常" },
              { code: "bold", name: "粗体" },
              { code: "bolder", name: "特粗体" },
              { code: "lighter", name: "细体" },
            ],
          },
          [...boxConfig.configure],
        ],
      },
      {
        name: "icon图标",
        list: [
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
