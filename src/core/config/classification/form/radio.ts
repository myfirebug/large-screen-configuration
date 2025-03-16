import { elementDataConfig } from "@src/core/config/base";
export const formRadio = {
  // 配置名称
  code: "formRadio",
  // 基础配置项
  configure: [
    [
      {
        name: "基础设置",
        list: [
          {
            componentName: "Select",
            label: "大小",
            name: "radioSize",
            required: false,
            placeholder: "",
            options: [
              { code: "large", name: "large" },
              { code: "middle", name: "middle" },
              { code: "small", name: "small" },
            ],
          },
          {
            componentName: "Select",
            label: "类型",
            name: "radioOptionType",
            required: false,
            placeholder: "",
            options: [
              { code: "default", name: "default" },
              { code: "button", name: "button" },
            ],
          },
          {
            componentName: "Select",
            label: "对齐方式",
            name: "radioTextAlign",
            required: false,
            placeholder: "",
            options: [
              { code: "center", name: "居中" },
              { code: "flex-start", name: "左对齐" },
              { code: "flex-end", name: "右对齐" },
            ],
          },
        ],
      },
    ],
  ],
  data: [...elementDataConfig.configure],
};
