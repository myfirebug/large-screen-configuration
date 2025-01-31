import { useState, useCallback } from "react";
import { API, IElement } from "@service/index";
export function elements() {
  // 是否处理loading状态
  const [elementsLoading, setElementsLoading] = useState<boolean>(false);
  const [elementsList, setElementsList] = useState<IElement[]>([]);
  const getElements = useCallback(() => {
    setElementsLoading(true);
    API.elementsService
      .elements()
      .then((res) => {
        setElementsLoading(false);
        setElementsList(res.data);
      })
      .catch(() => {
        setElementsLoading(false);
      });
  }, []);

  return {
    elementsLoading,
    elementsList,
    getElements,
  };
}
