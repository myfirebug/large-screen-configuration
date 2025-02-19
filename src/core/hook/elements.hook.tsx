import { useState, useCallback } from "react";
import { API, IElement } from "@service/index";
export function elements() {
  // 是否处理loading状态
  const [elementsLoading, setElementsLoading] = useState<boolean>(false);
  const [elementsList, setElementsList] = useState<IElement[]>([]);
  const [filterElementsList, setFilterElementList] = useState<IElement[]>([]);
  const getElements = useCallback(() => {
    setElementsLoading(true);
    API.elementsService
      .elements()
      .then((res) => {
        setElementsLoading(false);
        setElementsList(res.data);
        setFilterElementList(res.data);
      })
      .catch(() => {
        setElementsLoading(false);
      });
  }, []);

  const filterHandle = useCallback(
    (params?: IAnyObject) => {
      if (!params || JSON.stringify(params) === "{}") {
        setFilterElementList(elementsList);
      } else {
        const { name, type, createTime } = params;
        setFilterElementList(() => {
          let arr: IElement[] = elementsList;
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
    [elementsList]
  );

  return {
    elementsLoading,
    elementsList,
    getElements,
    filterElementsList,
    filterHandle,
  };
}
