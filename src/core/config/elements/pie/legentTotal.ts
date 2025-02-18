import { echartsConfig } from "../../base";
import picConfig from "./pie";

export const legentTotalPie = {
  code: "legentTotalPie",
  ...picConfig,
  configureValue: {
    ...picConfig.configureValue,
    seriesInsideRadius: 40,
    seriesAutsideRadius: 60,
    ...echartsConfig.seriesItemStyleValue,
    ...echartsConfig.emphasisValue,
    seriesLabelPosition: "center",
    seriesLabelShow: false,
    emphasisLabelFontSize: 40,
    emphasisLabelFontWeight: "bold",
    seriesItemStyleBorderColor: "",
    seriesItemStyleColorBorderWidth: 0,
    seriesItemStyleColorBorderRadius: 0,
    seriesHorizontalPosition: 30,
    seriesVerticalPosition: 50,
    legendLeft: undefined,
    legendTop: "center",
    legendOrient: "vertical",
    legendRight: 15,
    legendTotal: true,
    legendIcon: "circle",
  },
  dataValue: picConfig.dataValue,
};
