import { echartsConfig, animateConfig, elementDataConfig } from "../../base";

const bar = {
  type: "bar",
  // 配置项值
  configureValue: {
    ...animateConfig.configureValue,
    ...echartsConfig.titleValue,
    ...echartsConfig.legendValue,
    ...echartsConfig.gridValue,
    ...echartsConfig.xAxisValue,
    ...echartsConfig.yAxisValue,
    ...echartsConfig.echartColorValue,
    ...echartsConfig.barValue,
    ...echartsConfig.seriesLabelValue,
    ...echartsConfig.seriesStackValue,
    xAxisBoundaryGap: true,
    yAxisBoundaryGap: true,
  },
  // 坐标值
  coordinateValue: {
    left: 0,
    top: 0,
    width: 467,
    height: 346,
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
export default bar;
