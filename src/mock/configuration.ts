import Mock from "mockjs";
export const configuration = {
  url: "/configuration",
  method: "get",
  data: {
    code: 0,
    sucess: true,
    data: Mock.mock({
      value: "@csentence(5)",
      series: [
        {
          seriesName: "@ctitle(3)",
          "data|6": [
            {
              name: "@region",
              "value|1-300": 100,
            },
          ],
        },
      ],
      "table|20": [
        {
          name: "@region",
          data: "902,381",
          progressBar: Mock.mock("@float(5, 100)") + "%",
        },
      ],
      "radio|3": [{ label: "@csentence(2)", value: "@increment" }],
    }),
  },
  message: "成功",
};
