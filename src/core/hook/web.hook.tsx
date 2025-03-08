import { useState, useCallback } from "react";
import { API, IPage } from "@service/index";
import localforage from "localforage";
import { CACHE_PAGES } from "../enums/access.enums";
export function web() {
  // 是否处理loading状态
  const [pagesLoading, setPagesLoading] = useState<boolean>(false);
  const [pagesList, setPagesList] = useState<IPage[]>([]);
  const [filterPagesList, setFilterPagesList] = useState<IPage[]>([]);
  const getPages = useCallback(() => {
    setPagesLoading(true);
    API.web
      .pages()
      .then((res) => {
        setPagesLoading(false);
        setPagesList(res.data);
        setFilterPagesList(res.data);
        // 缓存数据到indexdb
        localforage.setItem(CACHE_PAGES, res.data);
      })
      .catch(() => {
        setPagesLoading(false);
      });
  }, []);

  const filterHandle = useCallback(
    (params?: IAnyObject) => {
      if (!params || JSON.stringify(params) === "{}") {
        setFilterPagesList(pagesList);
      } else {
        const { name, type, createTime } = params;
        setFilterPagesList(() => {
          let arr: IPage[] = pagesList;
          if (name) {
            arr = arr.filter((item) => item.name.includes(name));
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
    [pagesList]
  );

  return {
    pagesLoading,
    pagesList,
    filterPagesList,
    getPages,
    filterHandle,
  };
}
