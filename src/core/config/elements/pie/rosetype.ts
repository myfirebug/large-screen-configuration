import { echartsConfig } from "../../base";
import picConfig from "./pie";

export const rosetypePie = {
  code: "rosetypePie",
  ...picConfig,
  configureValue: {
    ...picConfig.configureValue,
    seriesInsideRadius: 40,
    seriesAutsideRadius: 80,
    ...echartsConfig.seriesItemStyleValue,
    ...echartsConfig.emphasisValue,
    seriesRoseType: true,
  },
  dataValue: picConfig.dataValue,
};
