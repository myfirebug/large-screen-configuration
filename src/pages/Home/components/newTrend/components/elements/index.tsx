import React, { FC, useState } from "react";
import Echarts from "@src/compoents/echarts";
import Box from "../../../box";
import "./index.scss";
interface IElements {}

const Elements: FC<IElements> = () => {
  const [data] = useState([
    { value: 1048, name: "a" },
    { value: 735, name: "b" },
    { value: 580, name: "c" },
    { value: 484, name: "d" },
  ]);
  const [useLeaderboard] = useState([
    {
      name: "柱状图",
      value: 100,
    },
    {
      name: "柱状图",
      value: 100,
    },
    {
      name: "柱状图",
      value: 100,
    },
    {
      name: "柱状图",
      value: 100,
    },
    {
      name: "柱状图",
      value: 100,
    },
    {
      name: "柱状图",
      value: 100,
    },
    {
      name: "柱状图",
      value: 100,
    },
    {
      name: "柱状图",
      value: 100,
    },
    {
      name: "柱状图",
      value: 100,
    },
  ]);
  return (
    <div className="cms-home__elements">
      <div className="cms-home__elements--left">
        <Echarts
          option={{
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: [
              {
                type: "category",
                data: [
                  "2023-01",
                  "2023-02",
                  "2023-03",
                  "2023-04",
                  "2023-05",
                  "2023-06",
                  "2023-07",
                  "2023-08",
                  "2023-09",
                  "2023-10",
                  "2023-11",
                  "2023-12",
                ],
                axisPointer: {
                  type: "shadow",
                },
              },
            ],
            yAxis: [
              {
                type: "value",
                interval: 50,
                axisLabel: {
                  formatter: "{value}",
                },
                axisLine: {
                  show: false,
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: "dashed",
                    color: "rgba(255,255,255,0.24)",
                  },
                },
              },
            ],
            series: [
              {
                name: "组件新增",
                type: "bar",
                barWidth: "50%",
                itemStyle: {
                  borderRadius: 5,
                },
                data: [
                  100, 300, 200, 334, 390, 330, 220, 200, 334, 390, 330, 220,
                ],
              },
            ],
          }}
        />
      </div>
      <div className="cms-home__elements--right">
        <Box
          title="组件使用排行榜"
          style={{ height: "420px" }}
          className="cms-useLeaderboard"
        >
          <ul className="cms-useLeaderboard__list">
            {useLeaderboard.map((item, index) => (
              <li key={index} className="cms-useLeaderboard__item">
                <div className="id">{index + 1}</div>
                <div className="name">{item.name}</div>
                <div className="value">{item.value}</div>
              </li>
            ))}
          </ul>
        </Box>
        <Box title="组件类型占比" style={{ height: "250px" }}>
          <Echarts
            option={{
              tooltip: {
                trigger: "item",
              },
              grid: {
                top: 30,
                bottom: 30,
              },
              legend: {
                // 对图形的解释部分
                orient: "vertical",
                right: 30,
                y: "center",
                icon: "circle", // 添加
                formatter: function (name: string) {
                  // 添加
                  let total = 0;
                  let target = 0;
                  for (let i = 0; i < data.length; i++) {
                    total += data[i].value;
                    if (data[i].name === name) {
                      target = data[i].value;
                    }
                  }
                  var arr = [
                    "{a|" + name + "}",
                    "{b|" + ((target / total) * 100).toFixed(2) + "%}",
                  ];
                  return arr.join("  ");
                },
                textStyle: {
                  // 添加
                  padding: [8, 0, 0, 0],
                  rich: {
                    a: {
                      fontSize: 14,
                      width: 80,
                      color: "#fff",
                    },
                    b: {
                      fontSize: 14,
                      width: 70,
                      color: "#fff",
                    },
                  },
                },
              },
              series: [
                {
                  name: "Temperature",
                  type: "pie",
                  radius: ["40%", "70%"],
                  center: ["25%", "50%"],
                  label: {
                    show: false,
                    position: "center",
                  },
                  data: data,
                },
              ],
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default Elements;
