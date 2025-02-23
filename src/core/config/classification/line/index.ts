import { echartsConfig, animateConfig } from "../../base";

export const line = {
  configure: [
    [
      {
        name: "基础设置",
        list: [
          ...echartsConfig.line,
          ...echartsConfig.seriesStack,
          echartsConfig.seriesLabel,
          echartsConfig.symbol,
        ],
      },
      {
        name: "标题",
        list: echartsConfig.title,
      },
      {
        name: "图例",
        list: echartsConfig.legend,
      },
      {
        name: "网格",
        list: echartsConfig.grid,
      },
      {
        name: "X轴",
        list: echartsConfig.xAxis,
      },
      {
        name: "y轴",
        list: echartsConfig.yAxis,
      },
      {
        name: "自定义颜色",
        list: echartsConfig.echartColor,
      },
      ...animateConfig.configure,
    ],
  ],
};
