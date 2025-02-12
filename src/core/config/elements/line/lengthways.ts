import lineConfig from "./line";

export const lengthwaysLine = {
  code: "lengthwaysLine",
  ...lineConfig,
  configureValue: {
    ...lineConfig.configureValue,
    xAxisType: "value",
    yAxisType: "category",
  },
};
