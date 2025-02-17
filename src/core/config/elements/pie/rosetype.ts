import picConfig from "./pie";

export const rosetypePie = {
  code: "rosetypePie",
  ...picConfig,
  configureValue: {
    ...picConfig.configureValue,
    seriesInsideRadius: 40,
    seriesAutsideRadius: 80,
    seriesRoseType: true,
  },
  dataValue: picConfig.dataValue,
};
