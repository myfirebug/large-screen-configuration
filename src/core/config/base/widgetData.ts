export const widgetDataConfig = {
  // 数据项默认值
  configureValue: {
    dataType: "mock",
    mock: {
      value: "文本框",
    },
    params: {},
    method: "get",
    field: "value",
  },
  // 数据项配置
  configure: [
    {
      componentName: "TextArea",
      label: "接口地址",
      name: "url",
      required: true,
      placeholder: "请输入接口地址",
    },
    {
      componentName: "Select",
      label: "请求方式",
      name: "method",
      required: true,
      placeholder: "",
      options: [
        { code: "get", name: "GET" },
        { code: "post", name: "post" },
      ],
    },
    {
      componentName: "JsonEdit",
      label: "请求参数",
      name: "params",
      required: false,
      placeholder: "请输入请求参数",
    },
  ],
};
