export const formRadio = {
  code: "formRadio",
  // 配置项值
  configureValue: {
    radioSize: "small",
    radioOptionType: "default",
    radioTextAlign: "flex-end",
  },
  // 配置项值
  dataValue: {
    useInterface: false,
    mock: {
      formRadio: [
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
    field: "formRadio",
  },
};
