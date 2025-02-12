import { echartsConfig, animateConfig, dataConfig } from "../../base";

const lineConfig = {
  type: "line",
  // 配置项值
  configureValue: {
    styleDisplay: "block",
    ...animateConfig.configureValue,
    ...echartsConfig.titleValue,
    ...echartsConfig.legendValue,
    ...echartsConfig.gridValue,
    ...echartsConfig.xAxisValue,
    ...echartsConfig.yAxisValue,
    ...echartsConfig.echartColorValue,
    ...echartsConfig.lineValue,
    ...echartsConfig.seriesLabelValue,
    ...echartsConfig.seriesStackValue,
    ...echartsConfig.symbolValue,
  },
  // 数据值
  dataValue: {
    ...dataConfig.configureValue,
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

export default lineConfig;
