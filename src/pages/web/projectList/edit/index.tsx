import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import {
  ConfigLayoutHeader,
  ConfigLayoutMain,
  ConfigLayoutLeftAside,
  ConfigLayoutRightAside,
  ConfigLayoutRightAsideLayer,
  ConfigLayoutLeftAsideWidget,
  ConfigLayoutRightAsideWidget,
  ConfigLayoutRightAsideElement,
  ConfigLayoutRightAsideData,
  ConfigLayoutRightAsidePage,
  ConfigLayoutRightAsideProject,
  ConfigLayoutLeftAsidePage,
} from "@src/layout/configLayout";

import "@src/layout/configLayout/index.scss";
import { initialState, projectReducer } from "./store/reducers";
import "animate.css";
import { guid } from "@src/utils";
import { pageConfig, projectConfig } from "@src/core/config/base";
import "./index.scss";

import { IWidget } from "@src/service";
import { Layout } from "react-grid-layout";
import { Empty } from "antd";
import RenderPage from "@src/compoents/renderPage";
import Navigation from "@src/compoents/navigation";
import PreviewDialog from "@src/compoents/previewDialog";

interface IConfigLayout {}

const ConfigLayout: FC<IConfigLayout> = () => {
  let location = useLocation();
  const [layout, dispatch] = useReducer(projectReducer, initialState);
  const [show, setShow] = useState(false);
  const [isShowAuxiliaryLine] = useState(true);
  // const [scale, setScale] = useState(100);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // 编辑
    if (queryParams.size) {
      const projectId = queryParams.get("projectId");
      if (projectId) {
      }
    } else {
      dispatch({
        type: "PROJECT",
        data: {
          name: "未命名项目",
          url: "",
          createTime: "",
          projectId: guid(),
          screenRatio: "4*4",
          pages: [],
          configuration: {
            configureValue: { ...projectConfig.configureValue },
          },
        },
      });
    }
  }, [location]);

  // 判断右侧边栏所需模块
  const rightAside = useMemo(() => {
    let arr: PageType[] = ["project"];
    if (layout?.projectId) {
      if (layout?.pageId) {
        arr = ["layer", "project"];
        if (layout?.widgetId) {
          if (layout?.elementId) {
            arr = ["layer", "element", "widget", "project", "data"];
          } else {
            arr = ["layer", "widget", "project", "data"];
          }
        } else {
          arr = ["layer", "project"];
        }
      }
    } else {
      arr = ["layer", "project"];
    }

    return arr;
  }, [layout?.elementId, layout?.pageId, layout?.projectId, layout?.widgetId]);

  // 图层选择
  const layerSelectedHandle = useCallback(
    (
      type: "page" | "widget" | "element" | "project",
      id: string,
      pid?: string
    ) => {
      switch (type) {
        case "widget": {
          if (layout?.widgetId !== id) {
            dispatch({
              type: "SELECT_WIDGET",
              widgetId: id,
            });
          }
          return;
        }
        case "element": {
          if (layout?.elementId !== id) {
            dispatch({
              type: "SELECT_ELEMENT",
              widgetId: pid as string,
              elementId: id,
            });
          }
          return;
        }
        default:
      }
    },
    [layout?.elementId, layout?.widgetId]
  );
  const currentPage = useMemo(() => {
    return layout?.project?.pages?.find(
      (item) => item.pageId === layout?.pageId
    );
  }, [layout?.pageId, layout?.project?.pages]);
  // 当前选中的微件
  const currentWidget = useMemo(() => {
    return currentPage?.widgets.find(
      (item) => layout?.widgetId && item.widgetId === layout?.widgetId
    );
  }, [currentPage?.widgets, layout?.widgetId]);
  // 当前选中微件参数字段列表
  const currentWidgetParamFields = useMemo(() => {
    const params = currentWidget?.configuration?.dataValue?.params;
    let arr: string[] = [];
    try {
      for (let field in params) {
        arr.push(field);
      }
    } catch (err) {}
    return arr;
  }, [currentWidget?.configuration?.dataValue?.params]);
  // 当前选中的组件
  const currentElement = useMemo(() => {
    return currentWidget?.elements.find(
      (item) => layout?.elementId && item.elementId === layout?.elementId
    );
  }, [currentWidget?.elements, layout?.elementId]);
  // 新增微件
  const onDrop = useCallback(
    (item: Layout, data: IWidget, type: "header" | "body") => {
      dispatch({
        type: "ADD_WIDGET",
        data: {
          ...data,
          widgetId: guid(),
          x: item.x,
          y: item.y,
          position: type,
          url: "",
          elements: data?.elements?.map((element) => ({
            ...element,
            elementId: guid(),
            url: "",
          })),
        },
      });
    },
    []
  );
  // 修改微件
  const onDragStop = useCallback((item: Layout) => {
    dispatch({
      type: "MODIFY_WIDGET",
      data: {
        x: item.x,
        y: item.y,
        widgetId: item.i,
      },
    });
  }, []);
  // 改变大小
  const onResizeStop = useCallback((item: Layout) => {
    dispatch({
      type: "MODIFY_WIDGET",
      data: {
        row: item.w,
        column: item.h,
        widgetId: item.i,
      },
    });
  }, []);
  // 删除微件
  const onClose = useCallback((item: IAnyObject) => {
    dispatch({
      type: "DELETE_WIDGET",
      id: item.widgetId,
    });
  }, []);

  // 删除微件
  const onDeleteHandler = useCallback(
    (
      type: "page" | "widget" | "element" | "project",
      id: string,
      pid?: string
    ) => {
      if (type === "widget") {
        dispatch({
          type: "DELETE_WIDGET",
          id,
        });
      }
    },
    []
  );
  // 修改微件
  const onEditHandler = useCallback(
    (
      type: "page" | "widget" | "element" | "project",
      id: string,
      name: string,
      pid?: string
    ) => {
      if (type === "widget") {
        dispatch({
          type: "MODIFY_WIDGET",
          data: { name, widgetId: id },
        });
      }
    },
    []
  );
  return (
    <div className="cms-config-layout">
      <ConfigLayoutHeader
        name={layout?.project?.name}
        pageType="project"
        modifyNameSuccessHander={(name) => {
          dispatch({
            type: "MODIFY_PROJECT",
            data: {
              name,
            },
          });
        }}
        previewHandler={() => setShow(true)}
        publishHandler={() => {}}
        logo="&#xe628;"
      />
      <div className="cms-config-layout__content">
        <ConfigLayoutLeftAside
          navs={
            currentPage?.widgets?.length || !currentPage
              ? ["widget"]
              : ["widget", "page"]
          }
          render={(data) => {
            if (data === "widget") {
              return <ConfigLayoutLeftAsideWidget />;
            } else if (data === "page") {
              return (
                <ConfigLayoutLeftAsidePage
                  onClick={(page) => {
                    if (!currentPage?.widgets.length) {
                      dispatch({
                        type: "ADD_WIDGET",
                        data: page.widgets,
                      });
                    }
                  }}
                />
              );
            }
            return null;
          }}
        />
        <ConfigLayoutMain
          // scale={scale}
          // setScale={setScale}
          style={{
            position: "relative",
            width: `${
              layout?.project?.configuration?.configureValue?.pageConfigWidth ||
              1366
            }px`,
            height: `${
              layout?.project?.configuration?.configureValue
                ?.pageConfigHeight || 768
            }px`,
            background: "var(--cms-background-color-secondary)",
          }}
          id="js_project"
        >
          {layout?.project?.pages?.length ? (
            <>
              <RenderPage
                data={layout?.project || {}}
                // transformScale={scale / 100}
                configureValue={layout?.project?.configuration?.configureValue}
                widgets={currentPage?.widgets || []}
                selectedId={layout?.widgetId}
                onDrop={onDrop}
                isDroppable={isShowAuxiliaryLine}
                isResizable={isShowAuxiliaryLine}
                staticed={!isShowAuxiliaryLine}
                onDragStop={onDragStop}
                onResizeStop={onResizeStop}
                onClose={onClose}
              />
              <Navigation
                configureValue={layout?.project?.configuration?.configureValue}
                datas={layout?.project?.pages}
                selectedId={layout?.pageId as string}
                onChange={(pageId: string) => {
                  dispatch({
                    type: "MODIFY_PAGE",
                    data: {
                      pageId: pageId,
                    },
                  });
                }}
              />
            </>
          ) : (
            <Empty
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="请先在右侧添加页面，才能进行后面的操作哦！"
            />
          )}
        </ConfigLayoutMain>
        <ConfigLayoutRightAside
          navs={rightAside}
          render={(data) => {
            if (data === "layer") {
              return (
                <div>
                  <ConfigLayoutRightAsideLayer
                    datas={currentPage ? [currentPage] : []}
                    pageId={layout?.pageId}
                    widgetId={layout?.widgetId}
                    elementId={layout?.elementId}
                    projectId={layout?.projectId}
                    onSelected={layerSelectedHandle}
                    pageType="project"
                    onDeleteHandler={onDeleteHandler}
                    onEditHandler={onEditHandler}
                  />
                </div>
              );
            } else if (data === "widget") {
              return (
                <ConfigLayoutRightAsideWidget
                  configureValue={
                    (currentWidget?.configuration
                      ?.configureValue as IAnyObject) || {}
                  }
                  onFinish={(data: IAnyObject) => {
                    dispatch({
                      type: "MODIFY_WIDGET",
                      data: {
                        ...currentWidget,
                        configuration: {
                          ...currentWidget?.configuration,
                          configureValue: {
                            ...currentWidget?.configuration?.configureValue,
                            ...data,
                          },
                        },
                      },
                    });
                  }}
                />
              );
            } else if (data === "element") {
              return (
                <ConfigLayoutRightAsideElement
                  element={currentElement?.element}
                  configureValue={
                    currentElement?.configuration.configureValue || {}
                  }
                  onFinish={(data: IAnyObject) => {
                    dispatch({
                      type: "MODIFY_ELEMENT",
                      data: {
                        ...currentElement,
                        configuration: {
                          ...currentElement?.configuration,
                          configureValue: {
                            ...currentElement?.configuration?.configureValue,
                            ...data,
                          },
                        },
                      },
                    });
                  }}
                />
              );
            } else if (data === "data") {
              return (
                <ConfigLayoutRightAsideData
                  isShowWidgetDataConfig
                  paramFields={
                    currentElement?.type === "form"
                      ? currentWidgetParamFields
                      : []
                  }
                  widgetDataValue={currentWidget?.configuration?.dataValue}
                  widgetOnFinish={(data: IAnyObject) => {
                    dispatch({
                      type: "MODIFY_WIDGET",
                      data: {
                        ...currentWidget,
                        configuration: {
                          ...currentWidget?.configuration,
                          dataValue: {
                            ...currentWidget?.configuration?.dataValue,
                            ...data,
                          },
                        },
                      },
                    });
                  }}
                  elementDataValue={currentElement?.configuration.dataValue}
                  elementOnFinish={(data: IAnyObject) => {
                    dispatch({
                      type: "MODIFY_ELEMENT",
                      data: {
                        ...currentElement,
                        configuration: {
                          ...currentElement?.configuration,
                          dataValue: {
                            ...currentElement?.configuration?.dataValue,
                            ...data,
                          },
                        },
                      },
                    });
                  }}
                />
              );
            } else if (data === "page") {
              return (
                <ConfigLayoutRightAsidePage
                  configureValue={currentPage?.configuration?.configureValue}
                  onFinish={(data) => {}}
                />
              );
            } else if (data === "project") {
              return (
                <ConfigLayoutRightAsideProject
                  configureValue={
                    layout?.project?.configuration?.configureValue
                  }
                  pages={layout?.project?.pages || []}
                  pageId={layout?.pageId}
                  onFinish={(data) => {
                    dispatch({
                      type: "MODIFY_PROJECT_CONFIGUREVALUE",
                      data,
                    });
                  }}
                  modifyPageHandler={(data) => {
                    dispatch({
                      type: "MODIFY_PAGE",
                      data,
                    });
                  }}
                  addPageHandler={(name) => {
                    dispatch({
                      type: "ADD_PAGE",
                      data: {
                        name: name,
                        id: "",
                        url: "",
                        createTime: "",
                        count: 0,
                        pageId: guid(),
                        screenRatio: "4*4",
                        widgets: [],
                        configuration: {
                          configureValue: { ...pageConfig.configureValue },
                        },
                      },
                    });
                  }}
                  selectPageHandler={(pageId) => {
                    dispatch({
                      type: "SELECT_PAGE",
                      pageId,
                    });
                  }}
                  deletePageHandler={(pageId) => {
                    dispatch({
                      type: "DELETE_PAGE",
                      pageId,
                    });
                  }}
                />
              );
            }
            return <div>{data}</div>;
          }}
        />
      </div>
      {/* 页面预览 */}
      <PreviewDialog
        data={layout?.project}
        pageType="project"
        title="项目预览"
        open={show}
        onClose={() => setShow(false)}
        width={
          layout?.project?.configuration?.configureValue?.widgetConfigWidth ||
          1366
        }
        height={
          layout?.project?.configuration?.configureValue?.widgetConfigHeight ||
          768
        }
      />
    </div>
  );
};

export default ConfigLayout;
