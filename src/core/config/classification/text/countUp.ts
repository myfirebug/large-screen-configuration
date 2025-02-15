import { dataConfig } from "../../base";

export const countUp = {
  // 配置名称
  code: "countUp",
  // 基础配置项
  configure: [
    [
      {
        name: "基础设置",
        list: [
          {
            componentName: "Select",
            label: "水平对齐方式",
            name: "styleJustifyContent",
            required: false,
            placeholder: "",
            options: [
              { code: "flex-start", name: "左对齐" },
              { code: "flex-end", name: "右对齐" },
              { code: "center", name: "居中" },
              { code: "space-between", name: "两端对齐" },
              { code: "space-around", name: "间隔相等" },
            ],
          },
          {
            componentName: "Select",
            label: "垂直对齐方式",
            name: "styleAlignItems",
            required: false,
            placeholder: "",
            options: [
              { code: "flex-start", name: "上对齐" },
              { code: "flex-end", name: "下对齐" },
              { code: "center", name: "居中" },
            ],
          },
          {
            componentName: "InputNumber",
            label: "行高",
            name: "styleLineHeight",
            required: false,
            placeholder: "",
            addonAfter: "px",
          },
        ],
      },
      {
        name: "滚动区域",
        list: [
          {
            componentName: "InputNumber",
            label: "字体大小",
            name: "countUpStyleFontSize",
            required: false,
            min: 12,
            placeholder: "",
            addonAfter: "px",
          },
          {
            componentName: "SketchPicker",
            label: "字体颜色",
            name: "countUpStyleColor",
            required: false,
            placeholder: "请选择字体颜色",
          },
          {
            componentName: "Select",
            label: "字体样式",
            name: "countUpStyleFontFamily",
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
            name: "countUpStyleFontWeight",
            required: false,
            placeholder: "",
            options: [
              { code: "normal", name: "正常" },
              { code: "bold", name: "粗体" },
              { code: "bolder", name: "特粗体" },
              { code: "lighter", name: "细体" },
            ],
          },

          [
            {
              name: "内边距",
              list: [
                {
                  componentName: "InputNumber",
                  label: "左边距",
                  name: "countUpStylePaddingLeft",
                  required: false,
                  placeholder: "请输入左边距",
                  addonAfter: "px",
                },
                {
                  componentName: "InputNumber",
                  label: "右边距",
                  name: "countUpStylePaddingRight",
                  required: false,
                  placeholder: "请输入右边距",
                  addonAfter: "px",
                },
                {
                  componentName: "InputNumber",
                  label: "上边距",
                  name: "countUpStylePaddingTop",
                  required: false,
                  placeholder: "请输入上边距",
                  addonAfter: "px",
                },
                {
                  componentName: "InputNumber",
                  label: "下边距",
                  name: "countUpStylePaddingBottom",
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
        name: "前置标签",
        list: [
          {
            componentName: "Input",
            label: "前置文本",
            name: "addonBefore",
            required: false,
            placeholder: "请输入前置文本",
          },
          {
            componentName: "InputNumber",
            label: "字体大小",
            name: "addonBeforeStyleFontSize",
            required: false,
            min: 12,
            placeholder: "",
            addonAfter: "px",
          },
          {
            componentName: "SketchPicker",
            label: "字体颜色",
            name: "addonBeforeStyleColor",
            required: false,
            placeholder: "请选择字体颜色",
          },
        ],
      },
      {
        name: "后置标签",
        list: [
          {
            componentName: "Input",
            label: "后置文本",
            name: "addonAfter",
            required: false,
            placeholder: "请输入后置文本",
          },
          {
            componentName: "InputNumber",
            label: "字体大小",
            name: "addonAfterStyleFontSize",
            required: false,
            min: 12,
            placeholder: "",
            addonAfter: "px",
          },
          {
            componentName: "SketchPicker",
            label: "字体颜色",
            name: "addonAfterStyleColor",
            required: false,
            placeholder: "请选择字体颜色",
          },
        ],
      },
    ],
  ],
  data: dataConfig.configure,
};
