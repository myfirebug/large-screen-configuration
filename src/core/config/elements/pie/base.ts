import picConfig from "./pie";

export const basePie = {
  code: "basePie",
  ...picConfig,
  configureValue: {
    ...picConfig.configureValue,
  },
  dataValue: picConfig.dataValue,
};
