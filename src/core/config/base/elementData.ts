export const elementDataConfig = {
  // 数据项默认值
  configureValue: {
    useInterface: false,
    mock: {
      value: "文本框",
    },
    field: "value",
  },
  // 数据项配置
  configure: [
    // {
    //   componentName: "Switch",
    //   label: "使用微件数据",
    //   name: "useInterface",
    //   required: false,
    //   placeholder: "",
    //   tooltip: "该组件使用微件的接口数据",
    // },
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
      componentName: "Input",
      label: "对应字段",
      name: "field",
      required: true,
      placeholder: "请输入对应字段",
    },
  ],
};
