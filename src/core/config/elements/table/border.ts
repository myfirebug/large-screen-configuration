import { tableConfig } from "./table";

export const borderTable = {
  code: "borderTable",
  ...tableConfig,
  configureValue: {
    ...tableConfig.configureValue,
    tableTbodyOddBorderStyle: "solid",
    tableTbodyOddBorderWidth: 1,
    tableTbodyOddBorderColor: "rgba(0, 178, 255, 0.24)",
    tableTbodyOddBoxInset: true,
    tableTbodyOddBoxShadowX: 0,
    tableTbodyOddBoxShadowY: 0,
    tableTbodyOddBoxShadowF: 23,
    tableTbodyOddBoxShadowC: "rgba(0, 178, 255, 0.24)",
    spaceBetween: 5,
    tableTbodyEvenBorderStyle: "solid",
    tableTbodyEvenBorderWidth: 1,
    tableTbodyEvenBorderColor: "rgba(0, 178, 255, 0.24)",
    tableTbodyEvenBoxInset: true,
    tableTbodyEvenBoxShadowX: 0,
    tableTbodyEvenBoxShadowY: 0,
    tableTbodyEvenBoxShadowF: 23,
    tableTbodyEvenBoxShadowC: "rgba(0, 178, 255, 0.24)",
  },
};
