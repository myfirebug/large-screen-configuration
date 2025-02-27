import { tableConfig } from "./table";

export const rankingTable = {
  code: "rankingTable",
  ...tableConfig,
  configureValue: {
    ...tableConfig.configureValue,
    serialNumberRank: true,
    tableTbodyOddBackgroundColor: "rgba(74, 140, 255, 0.18)",
    serialNumberBackgroundColor: "rgb(74, 140, 255)",
    serialNumberFontSize: 12,
  },
};
