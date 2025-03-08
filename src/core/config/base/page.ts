export const pageConfig = {
  type: "page",
  label: "页面配置",
  configureValue: {
    pageConfigWidth: 1366,
    pageConfigHeight: 768,
    horizontalNumber: 4,
    verticalNumber: 3,
    styleBackgroundColor: "#090548",
    headerStyleHeight: 80,
    headerShow: false,
  },
  configure: [
    [
      {
        name: "基础设置",
        list: [
          {
            componentName: "InputNumber",
            label: "宽度",
            name: "pageConfigWidth",
            required: false,
            min: 1366,
            max: 5000,
            tooltip: "只有配置页面有用，预览页面是全屏",
            placeholder: "请输入宽度",
          },
          {
            componentName: "InputNumber",
            label: "高度",
            name: "pageConfigHeight",
            required: false,
            min: 768,
            max: 3000,
            tooltip: "只有配置页面有用，预览页面是全屏",
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
            name: "styleBackgroundColor",
            required: false,
            placeholder: "请选择背景颜色",
          },
          {
            componentName: "Input",
            label: "背景图片",
            name: "styleBackgroundImage",
            required: false,
            placeholder: "请输入背景图片地址",
          },
        ],
      },
    ],

    [
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
};
