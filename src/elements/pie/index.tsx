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
    const { legendData, xAxisData, yAxisData, series } =
      handleData(currentData);
    return {
      ...configuration,
      tooltip: {
        trigger: "item",
      },
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
            ...configuration.pie.series,
            ...item,
            data: currentData[index].data,
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
