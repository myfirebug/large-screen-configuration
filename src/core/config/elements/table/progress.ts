import { elementDataConfig } from "../../base";
import { tableConfig } from "./table";

export const progressTable = {
  code: "progressTable",
  ...tableConfig,
  configureValue: {
    ...tableConfig.configureValue,
    serialNumberRank: true,
    tableTbodyOddBackgroundColor: "",
    serialNumberBackgroundColor: "rgb(74, 140, 255)",
    serialNumberFontSize: 12,
    progressForegroundColor: "#4abbff",
    progressBackgroundColor: "rgba(74, 187, 255, 0.1)",
    tableShowHeader: false,
    tableColumn: [
      {
        title: "序号",
        dataIndex: "index",
        align: "left",
        width: 30,
      },
      {
        title: "地区",
        dataIndex: "name",
        align: "left",
        width: 60,
      },
      {
        title: "占比",
        dataIndex: "progressBar",
        align: "left",
        components: "progress",
      },
      {
        title: "用电量",
        dataIndex: "data",
        align: "right",
        width: 80,
      },
    ],
  },
  dataValue: {
    ...elementDataConfig.configureValue,
    field: "table",
    mock: {
      table: [
        {
          name: "右玉县",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "逆城区",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "平鲁工",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "怀仁市",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "山阴县",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "应县",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "武侯区",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "高新区",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "双流区",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "青羊区",
          data: "902,381",
          progressBar: "50%",
        },
      ],
    },
  },
};
