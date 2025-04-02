export const formSelect = {
  code: "formSelect",
  // 配置项值
  configureValue: {
    radioSize: "small",
    radioTextAlign: "flex-end",
  },
  // 配置项值
  dataValue: {
    useInterface: false,
    mock: {
      formSelect: [
        {
          value: "year",
          label: "年度",
        },
        {
          value: "quarter",
          label: "季度",
        },
        {
          value: "monthly",
          label: "月度",
        },
      ],
    },
    field: "formSelect",
  },
};
