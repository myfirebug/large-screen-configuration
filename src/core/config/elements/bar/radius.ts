import bar from "./bar";

export const radiusBar = {
  code: "radiusBar",
  ...bar,
  configureValue: {
    ...bar.configureValue,
    barWidth: 20,
    barBorderRadius: 20,
  },
};
