import bar from "./bar";

export const backgroundColorBar = {
  code: "backgroundColorBar",
  ...bar,
  configureValue: {
    ...bar.configureValue,
    barShowBackground: true,
  },
};
