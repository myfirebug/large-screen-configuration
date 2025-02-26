import { useState, useCallback } from "react";
import { API, IWidget } from "@service/index";
export function widgets() {
  // 是否处理loading状态
  const [widgetsLoading, setWidgetsLoading] = useState<boolean>(false);
  const [widgetsList, setWidgetsList] = useState<IWidget[]>([]);
  const [filterWidgetsList, setFilterWidgetsList] = useState<IWidget[]>([]);
  const getWidgets = useCallback(() => {
    setWidgetsLoading(true);
    API.widgetsService
      .widgets()
      .then((res) => {
        setWidgetsLoading(false);
        setWidgetsList(res.data);
        setFilterWidgetsList(res.data);
      })
      .catch(() => {
        setWidgetsLoading(false);
      });
  }, []);

  const filterHandle = useCallback(
    (params?: IAnyObject) => {
      if (!params || JSON.stringify(params) === "{}") {
        setFilterWidgetsList(widgetsList);
      } else {
        const { name, type, createTime } = params;
        setFilterWidgetsList(() => {
          let arr: IWidget[] = widgetsList;
          if (name) {
            arr = arr.filter((item) => item.name.includes(name));
          }
          if (type) {
            arr = arr.filter((item) => item.type === type);
          }
          if (createTime) {
            arr = arr.filter(
              (item) =>
                new Date(item.createTime) > new Date(createTime[0]) &&
                new Date(item.createTime) < new Date(createTime[1])
            );
          }
          return arr;
        });
        console.log(name, type, createTime);
      }
    },
    [widgetsList]
  );

  return {
    widgetsLoading,
    widgetsList,
    getWidgets,
    filterWidgetsList,
    filterHandle,
  };
}
