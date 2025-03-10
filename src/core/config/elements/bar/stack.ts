import bar from "./bar";

export const stackBar = {
  code: "stackBar",
  ...bar,
  configureValue: {
    ...bar.configureValue,
    seriesStackValue: "total",
    seriesLabelShow: true,
    seriesLabelPosition: "inside",
    seriesLabelColor: "#fff",
  },
  dataValue: {
    ...bar.dataValue,
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
        {
          seriesName: "Direct",
          data: [
            {
              name: "Mon",
              value: 220,
            },
            {
              name: "Tue",
              value: 182,
            },
            {
              name: "Wed",
              value: 191,
            },
            {
              name: "Thu",
              value: 234,
            },
            {
              name: "Fri",
              value: 290,
            },
            {
              name: "Sat",
              value: 330,
            },
            {
              name: "Sun",
              value: 310,
            },
          ],
        },
      ],
    },
  },
};
