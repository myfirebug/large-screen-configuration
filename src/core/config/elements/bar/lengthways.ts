import bar from "./bar";

export const lengthwaysBar = {
  code: "lengthwaysBar",
  ...bar,
  configureValue: {
    ...bar.configureValue,
    barWidth: 15,
    barBorderRadius: 20,
    xAxisType: "value",
    yAxisType: "category",
  },
};
