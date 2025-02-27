import { tableConfig } from "./table";

export const interlacingTable = {
  code: "interlacingTable",
  ...tableConfig,
  configureValue: {
    ...tableConfig.configureValue,
    tableTbodyOddBackgroundColor: "rgba(74, 140, 255, 0.18)",
  },
};
