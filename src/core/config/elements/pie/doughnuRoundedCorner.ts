import { echartsConfig } from "../../base";
import picConfig from "./pie";

export const doughnuRoundedCornerPie = {
  code: "doughnuRoundedCornerPie",
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
    seriesItemStyleBorderColor: "",
    seriesItemStyleColorBorderWidth: 2,
    seriesItemStyleColorBorderRadius: 10,
  },
  dataValue: picConfig.dataValue,
};
