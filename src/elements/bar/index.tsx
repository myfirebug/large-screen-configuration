import React, { memo, useMemo } from "react";
import Echarts from "@src/compoents/echarts";
import { getStyles, handleData, handleEchartsOption } from "@src/utils";
import * as echarts from "echarts";
import tinycolor from "tinycolor2";
interface IBar {
  options: IAnyObject;
  data: any;
  field: string;
}

const Bar = memo((props: IBar) => {
  const { options, data, field } = props;
  // 处理echarts数据
  const getOption = useMemo(() => {
    const configuration = handleEchartsOption(options);
    const currentData = data && data[field] ? data[field] : [];
    const { legendData, xAxisData, yAxisData, series } =
      handleData(currentData);
    // 当前系列颜色
    const currentColor = (index: number) => {
      return configuration.color[index % (configuration.color.length - 1)];
    };

    return {
      ...configuration,
      legend: {
        ...configuration.legend,
        data: legendData,
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
            ...configuration.bar.series,
            ...item,
            itemStyle: {
              borderRadius: options?.barBorderRadius || 0,
              color: !options.barGradation
                ? currentColor(index)
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: tinycolor(currentColor(index))
                        .lighten(15)
                        .toString(),
                    },
                    {
                      offset: 0.5,
                      color: currentColor(index),
                    },
                    {
                      offset: 1,
                      color: tinycolor(currentColor(index))
                        .darken(15)
                        .toString(),
                    },
                  ]),
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

export default Bar;
