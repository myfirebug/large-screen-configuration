import { echartsConfig, animateConfig } from "../../base";

export const bar = {
  configure: [
    [
      {
        name: "柱状设置",
        list: [
          ...echartsConfig.seriesStack,
          ...echartsConfig.bar,
          echartsConfig.seriesLabel,
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
