import React, { memo, useMemo } from "react";
import Echarts from "@src/compoents/echarts";
import { getStyles, handleData, handleEchartsOption } from "@src/utils";
interface IPie {
  options: IAnyObject;
  data: any;
  field: string;
}

const Pie = memo((props: IPie) => {
  const { options, data, field } = props;
  // 处理echarts数据
  const getOption = useMemo(() => {
    const configuration = handleEchartsOption(options);
    const currentData = data && data[field] ? data[field] : [];
    const { legendData, xAxisData, yAxisData, series } = handleData(
      currentData,
      "pie"
    );
    return {
      ...configuration,
      tooltip: {
        trigger: "item",
      },
      legend: {
        ...configuration.legend,
        data: legendData,
        formatter: function (name: string) {
          const isOnlyOne = data.series.length === 1;
          let arr = ["{a|" + name + "}"];
          if (isOnlyOne && options.legendTotal) {
            // 添加
            let total = 0;
            let target = 0;
            for (let i = 0; i < data.series[0].data.length; i++) {
              total += data.series[0].data[i].value;
              if (data.series[0].data[i].name === name) {
                target = data.series[0].data[i].value;
              }
            }
            arr.push("{b|" + ((target / total) * 100).toFixed(2) + "%}");
          }

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
              align: "right",
              color: "#fff",
            },
          },
        },
      },
      xAxis: {
        ...configuration.xAxis,
        data: xAxisData,
      },
      yAxis: {
        ...configuration.yAxis,
        data: yAxisData,
      },
      series: series
        ? series.map((item, index) => ({
            ...configuration.pie.series,
            ...item,
            data: currentData[index].data,
            itemStyle: {
              borderWidth: options.seriesItemStyleColorBorderWidth,
              borderColor: options.seriesItemStyleBorderColor,
              borderRadius: options.seriesItemStyleColorBorderRadius,
            },
            center: [
              `${options.seriesHorizontalPosition}%`,
              `${options.seriesVerticalPosition}%`,
            ],
            emphasis: {
              scaleSize: options.emphasisScaleSize,
              label: {
                show: true,
                fontSize: options.emphasisLabelFontSize,
                fontWeight: options.emphasisLabelFontWeight,
                color: options.emphasisLabelColor,
              },
              itemStyle: {
                shadowBlur: options.emphasisStyleShadowBlur,
                shadowOffsetX: options.emphasisStyleShadowOffsetX,
                shadowOffsetY: options.emphasisStyleShadowOffsetY,
                shadowColor: options.emphasisStyleShadowColor,
              },
            },
          }))
        : [],
    };
  }, [data, field, options]);

  console.log(getOption, "getOption");
  const style = useMemo(() => {
    return getStyles(options);
  }, [options]);
  return (
    <div style={{ ...style, width: "100%", height: "100%" }}>
      <Echarts option={getOption} />
    </div>
  );
});

export default Pie;
