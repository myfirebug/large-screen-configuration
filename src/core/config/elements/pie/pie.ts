import { echartsConfig, animateConfig, elementDataConfig } from "../../base";

const pieConfig = {
  type: "pie",
  // 配置项值
  configureValue: {
    styleDisplay: "block",
    ...animateConfig.configureValue,
    ...echartsConfig.titleValue,
    ...echartsConfig.legendValue,
    ...echartsConfig.echartColorValue,
    ...echartsConfig.pieValue,
    ...echartsConfig.seriesItemStyleValue,
    ...echartsConfig.emphasisValue,
    xAxisShow: false,
    yAxisShow: false,
    seriesLabelShow: true,
    seriesLabelPosition: "outside",
    seriesLabelColor: "",
    xAxisType: "category",
    yAxisType: "value",
  },
  // 数据值
  dataValue: {
    ...elementDataConfig.configureValue,
    field: "series",
    mock: {
      series: [
        {
          seriesName: "Email",
          data: [
            {
              name: "Mon",
              value: 120,
            },
            {
              name: "Tue",
              value: 132,
            },
            {
              name: "Wed",
              value: 101,
            },
            {
              name: "Thu",
              value: 134,
            },
            {
              name: "Fri",
              value: 90,
            },
            {
              name: "Sat",
              value: 230,
            },
            {
              name: "Sun",
              value: 210,
            },
          ],
        },
      ],
    },
  },
};

export default pieConfig;
