import { useState, useCallback } from "react";
import { API, IPage, IProject } from "@service/index";
export function web() {
  // 页面模版
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
      })
      .catch(() => {
        setPagesLoading(false);
      });
  }, []);

  const pageFilterHandle = useCallback(
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

  // 项目列表
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);
  const [projectsList, setProjectsList] = useState<IProject[]>([]);
  const [filterProjectsList, setFilterProjectsList] = useState<IProject[]>([]);
  const getProjects = useCallback(() => {
    setPagesLoading(true);
    API.web
      .projects()
      .then((res) => {
        setProjectsLoading(false);
        setProjectsList(res.data);
        setFilterProjectsList(res.data);
      })
      .catch(() => {
        setProjectsLoading(false);
      });
  }, []);

  const projectsFilterHandle = useCallback(
    (params?: IAnyObject) => {
      if (!params || JSON.stringify(params) === "{}") {
        setFilterProjectsList(projectsList);
      } else {
        const { name, type, createTime } = params;
        setFilterProjectsList(() => {
          let arr: IProject[] = projectsList;
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
    [projectsList]
  );

  return {
    pagesLoading,
    pagesList,
    filterPagesList,
    getPages,
    pageFilterHandle,
    projectsLoading,
    projectsList,
    filterProjectsList,
    getProjects,
    projectsFilterHandle,
  };
}
