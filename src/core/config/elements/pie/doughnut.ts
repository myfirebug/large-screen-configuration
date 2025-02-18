import { echartsConfig } from "../../base";
import picConfig from "./pie";

export const doughnutPie = {
  code: "doughnutPie",
  ...picConfig,
  configureValue: {
    ...picConfig.configureValue,
    seriesInsideRadius: 40,
    seriesAutsideRadius: 80,
    ...echartsConfig.seriesItemStyleValue,
    ...echartsConfig.emphasisValue,
    seriesLabelPosition: "center",
    seriesLabelShow: false,
    emphasisLabelFontSize: 40,
    emphasisLabelFontWeight: "bold",
  },
  dataValue: picConfig.dataValue,
};
