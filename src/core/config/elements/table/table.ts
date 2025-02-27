import { elementDataConfig, swiperConfig } from "../../base";

export const tableConfig = {
  type: "table",
  // 配置项值
  configureValue: {
    ...swiperConfig.configureValue,
    tableHeaderBackgroudColor: "#4a8cff",
    tableHeaderColor: "#fff",
    tableShowBorderColor: "rgba(230,30,30,1)",
    tableShowHeader: true,
    tableTbodyColor: "#fff",
    slidesPerView: 9,
    tableColumn: [
      {
        title: "序号",
        dataIndex: "index",
        align: "left",
        width: 30,
      },
      {
        title: "公司名称",
        dataIndex: "name",
        align: "left",
      },
      {
        title: "用电量",
        dataIndex: "data",
        align: "left",
        width: 100,
      },
    ],
  },
  // 数据值
  dataValue: {
    ...elementDataConfig.configureValue,
    field: "table",
    mock: {
      table: [
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
        {
          name: "朔州市工业自动化股份有限公司",
          data: "902,381",
          progressBar: "50%",
        },
      ],
    },
  },
};
