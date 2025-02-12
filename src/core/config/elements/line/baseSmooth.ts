import lineConfig from "./line";

export const baseSmoothLine = {
  code: "baseSmoothLine",
  ...lineConfig,
  configureValue: {
    ...lineConfig.configureValue,
    lineSmooth: true,
  },
};
