import bar from "./bar";

export const gradationBar = {
  code: "gradationBar",
  ...bar,
  configureValue: {
    ...bar.configureValue,
    barGradation: true,
    barBorderRadius: 4,
  },
};
