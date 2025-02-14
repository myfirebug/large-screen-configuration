import bar from "./bar";

export const axisAlignWithTickBar = {
  code: "axisAlignWithTickBar",
  ...bar,
  configureValue: {
    ...bar.configureValue,
    xAxisAlignWithLabel: true,
    xAxisBoundaryGap: false,
  },
};
