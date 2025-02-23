export const widgetDataConfig = {
  // 数据项默认值
  configureValue: {
    useInterface: false,
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
      componentName: "Switch",
      label: "使用微件数据",
      name: "useInterface",
      required: false,
      placeholder: "",
      tooltip: "该组件使用微件的接口数据",
    },
    {
      componentName: "JsonEdit",
      label: "模拟数据",
      name: "mock",
      required: false,
      placeholder: "请输入mock数据",
      relationFields: "useInterface",
      relationValues: "false",
    },
    {
      componentName: "TextArea",
      label: "接口地址",
      name: "url",
      required: false,
      placeholder: "请输入接口地址",
      relationFields: "useInterface",
      relationValues: "true",
    },
    {
      componentName: "Select",
      label: "请求方式",
      name: "method",
      required: false,
      placeholder: "",
      relationFields: "useInterface",
      relationValues: "true",
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
      relationFields: "useInterface",
      relationValues: "true",
    },
    {
      componentName: "Input",
      label: "对应字段",
      name: "field",
      required: false,
      placeholder: "",
    },
  ],
};
