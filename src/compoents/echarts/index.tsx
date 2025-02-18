import React, { memo, useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { init as initChart } from "echarts/core";
import data from "./infographic.json";
import {
  Option,
  Theme,
  InitOptions,
  UpdateOptions,
  AutoresizeProp,
  LoadingOptions,
  EChartsType,
} from "./types";
echarts.registerTheme("infographic", data);

interface IEchartsProps {
  option: Option;
  theme?: Theme;
  initOptions?: InitOptions;
  updateOptions?: UpdateOptions;
  group?: string;
  autoresize?: AutoresizeProp;
  loading?: boolean;
  loadingOptions?: LoadingOptions;
}

const Echarts = memo(
  (props: IEchartsProps) => {
    const {
      theme,
      group,
      initOptions,
      option,
      updateOptions,
      loading = false,
      loadingOptions,
      autoresize = {},
    } = props;
    const dom = useRef<HTMLDivElement>(null);
    const chart = useRef<EChartsType>();
    const timmer = useRef<any>(0);
    // tooltip auto play current index
    const currentIndex = useRef<number>(-1);

    const autoPlayHandler = useCallback(() => {
      if (!option.series || !(option.series as echarts.SeriesOption[]).length) {
        return false;
      }

      if (chart.current) {
        if (timmer.current) {
          clearInterval(timmer.current);
        }
        timmer.current = setInterval(() => {
          const dataLen =
            option.series && (option.series as echarts.SeriesOption[]).length
              ? (
                  (option.series as echarts.SeriesOption[])[0]
                    ?.data as Array<any>
                ).length
              : 0;

          // 取消之前高亮的图形
          chart?.current?.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
          });
          currentIndex.current = (currentIndex.current + 1) % dataLen;
          // 高亮当前图形
          chart?.current?.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: currentIndex.current,
          });
          // 显示 tooltip
          chart?.current?.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: currentIndex.current,
          });
        }, 3000);
      }
    }, [chart, timmer, option, currentIndex]);

    // 鼠标移入事件
    const mouseHander = useCallback((e: any) => {
      clearInterval(timmer.current);
      currentIndex.current = e.dataIndex;
      // 取消之前高亮的图形
      chart?.current?.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      });
      // 高亮当前图形
      chart?.current?.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: currentIndex.current,
      });
    }, []);

    const init = useCallback(() => {
      if (!dom.current) {
        return;
      }
      if (!chart.current) {
        chart.current = initChart(
          dom.current,
          theme || "infographic",
          initOptions
        );
      }
      if (group) {
        chart.current.group = group;
      }

      if (loading) {
        chart.current.showLoading(loadingOptions);
      } else {
        chart.current.hideLoading();
      }

      if (option) {
        chart.current.setOption(
          {
            ...option,
            tooltip: {
              trigger: "axis",
              backgroundColor: "#000",
              borderColor: "rgba(255,255,255,.2)",
              padding: [8, 8],
              textStyle: {
                color: "#fff",
                fontSize: 14,
              },
              ...option.tooltip,
            },
          },
          updateOptions
        );
        autoPlayHandler();
      }
    }, [
      initOptions,
      option,
      theme,
      group,
      loading,
      loadingOptions,
      updateOptions,
      autoPlayHandler,
    ]);

    const cleanup = useCallback(() => {
      if (chart.current) {
        chart.current.off("mouseover", mouseHander);
        chart.current.off("mouseout", autoPlayHandler);
        chart.current.dispose();
        chart.current = undefined;
      }
    }, [autoPlayHandler, mouseHander]);

    useEffect(() => {
      init();
      const { onResize } = autoresize;
      const callback = () => {
        chart.current?.resize();
        onResize?.();
      };
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        callback();
      });

      resizeObserver.observe(dom.current as HTMLDivElement);
      return () => {
        cleanup();
        resizeObserver.disconnect();
      };
    }, [cleanup, init, autoresize]);

    useEffect(() => {
      if (chart.current) {
        chart.current.on("mouseover", mouseHander);
        chart.current.on("mouseout", autoPlayHandler);
      }
    }, [autoPlayHandler, mouseHander]);

    return (
      <div
        className="cms-echarts"
        ref={dom}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  },
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
      return true;
    }
    return false;
  }
);

export default Echarts;
