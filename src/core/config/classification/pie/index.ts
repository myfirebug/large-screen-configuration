import { echartsConfig, animateConfig } from "../../base";

export const pie = {
  configure: [
    [
      {
        name: "饼图设置",
        list: [
          ...echartsConfig.pie,
          echartsConfig.seriesLabel.map((item) => {
            console.log(item, "item");
            return {
              ...item,
              list: item.list.map((subItem) => {
                if (subItem.name === "seriesLabelPosition") {
                  return {
                    ...subItem,
                    options: [
                      { code: "outside", name: "outside" },
                      { code: "inside", name: "inside" },
                      { code: "center", name: "center" },
                    ],
                  };
                }
                return subItem;
              }),
            };
          }),
          echartsConfig.seriesItemStyle,
          echartsConfig.emphasis,
        ],
      },
      {
        name: "标题",
        list: [...echartsConfig.title],
      },
      {
        name: "图例",
        list: [...echartsConfig.legend],
      },
      {
        name: "自定义颜色",
        list: [...echartsConfig.echartColor],
      },
      ...animateConfig.configure,
    ],
  ],
};
