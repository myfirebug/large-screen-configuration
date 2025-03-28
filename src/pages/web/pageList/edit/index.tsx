import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
} from "@src/layout/configLayout";

import "@src/layout/configLayout/index.scss";
import { initialState, pageReducer } from "./store/reducers";
import "animate.css";
import html2canvas from "html2canvas";
import { message } from "antd";
import { guid } from "@src/utils";
import { pageConfig } from "@src/core/config/base";
import "./index.scss";

import { IElement, IPage, IWidget } from "@src/service";
import { CACHE_PAGES } from "@src/core/enums/access.enums";
import { Layout } from "react-grid-layout";
import localforage from "localforage";
import RenderPage from "@src/compoents/renderPage";
import PreviewDialog from "@src/compoents/previewDialog";

interface IConfigLayout {}

const ConfigLayout: FC<IConfigLayout> = () => {
  let location = useLocation();
  const [layout, dispatch] = useReducer(pageReducer, initialState);
  const [show, setShow] = useState(false);
  const [isShowAuxiliaryLine, setIsShowAuxiliaryLine] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // 编辑
    if (queryParams.size) {
      const pageId = queryParams.get("pageId");
      if (pageId) {
        localforage.getItem(CACHE_PAGES, (err, value) => {
          if (value) {
            const curr = (value as IPage[]).find(
              (item) => item.pageId === pageId
            );
            if (curr) {
              dispatch({
                type: "PAGE",
                data: curr,
              });
            } else {
              console.log("找不到微件ID");
            }
          }
        });
      }
    } else {
      dispatch({
        type: "PAGE",
        data: {
          name: "未命名页面",
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
    }
  }, [location]);

  // 判断右侧边栏所需模块
  const rightAside = useMemo(() => {
    let arr: PageType[] = [];
    if (layout?.pageId) {
      arr = ["layer", "page"];
      if (layout?.widgetId) {
        if (layout?.elementId) {
          arr = ["layer", "element", "widget", "page", "data"];
        } else {
          arr = ["layer", "widget", "page", "data"];
        }
      } else {
        arr = ["layer", "page"];
      }
    } else {
      arr = ["layer"];
    }
    return arr;
  }, [layout?.elementId, layout?.pageId, layout?.widgetId]);

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
  // 当前选中的微件
  const currentWidget = useMemo(() => {
    return layout?.page?.widgets.find(
      (item) => layout?.widgetId && item.widgetId === layout?.widgetId
    );
  }, [layout?.page?.widgets, layout?.widgetId]);

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
        name={layout?.page?.name}
        pageType="page"
        modifyNameSuccessHander={(name) => {
          dispatch({
            type: "MODIFY_PAGE",
            data: {
              name,
            },
          });
        }}
        previewHandler={() => setShow(true)}
        publishHandler={() => {
          dispatch({
            type: "SELECT_WIDGET",
            widgetId: "",
          });
          setIsShowAuxiliaryLine(false);
          setTimeout(() => {
            html2canvas(document.getElementById("js_page") as HTMLElement, {
              allowTaint: true,
              scale: 0.5,
              backgroundColor: "rgb(9, 5, 72)",
            }).then((canvas) => {
              try {
                dispatch({
                  type: "MODIFY_PAGE",
                  data: {
                    url: canvas?.toDataURL(),
                  },
                });
                // navigate(-1);
                console.log(navigate);
                message.success("发布成功");
              } catch (e) {
                message.error("存在跨域资源，缩略图获取失败");
              }
            });
          }, 10);
        }}
      />
      <div className="cms-config-layout__content">
        <ConfigLayoutLeftAside
          navs={["widget"]}
          render={(data) => {
            if (data === "widget") {
              return <ConfigLayoutLeftAsideWidget />;
            }
            return null;
          }}
        />
        <ConfigLayoutMain
          style={{
            position: "relative",
            width: `${
              layout?.page?.configuration?.configureValue?.pageConfigWidth ||
              1366
            }px`,
            height: `${
              layout?.page?.configuration?.configureValue?.pageConfigHeight ||
              768
            }px`,
          }}
          id="js_page"
        >
          <RenderPage
            data={layout?.page || {}}
            configureValue={layout?.page?.configuration?.configureValue}
            widgets={layout?.page?.widgets || []}
            selectedId={layout?.widgetId}
            onDrop={onDrop}
            isDroppable={isShowAuxiliaryLine}
            isResizable={isShowAuxiliaryLine}
            staticed={!isShowAuxiliaryLine}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            onClose={onClose}
          />
        </ConfigLayoutMain>
        <ConfigLayoutRightAside
          navs={rightAside}
          render={(data) => {
            if (data === "layer") {
              return (
                <div>
                  <ConfigLayoutRightAsideLayer
                    datas={layout?.page ? [layout?.page] : []}
                    pageId={layout?.pageId}
                    widgetId={layout?.widgetId}
                    elementId={layout?.elementId}
                    onSelected={layerSelectedHandle}
                    pageType="page"
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
                        ...(currentWidget as IWidget),
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
                        ...(currentElement as IElement),
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
                  widgetDataValue={currentWidget?.configuration?.dataValue}
                  widgetOnFinish={(data: IAnyObject) => {
                    dispatch({
                      type: "MODIFY_WIDGET",
                      data: {
                        ...(currentWidget as IWidget),
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
                        ...(currentElement as IElement),
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
                  configureValue={layout?.page?.configuration?.configureValue}
                  onFinish={(data) => {
                    const configuration = layout?.page?.configuration;
                    dispatch({
                      type: "MODIFY_PAGE",
                      data: {
                        configuration: {
                          ...configuration,
                          configureValue: {
                            ...configuration?.configureValue,
                            ...data,
                          },
                        },
                      },
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
        title="页面预览"
        pageType="page"
        data={layout?.page}
        open={show}
        onClose={() => setShow(false)}
        width={
          layout?.page?.configuration?.configureValue?.widgetConfigWidth || 1366
        }
        height={
          layout?.page?.configuration?.configureValue?.widgetConfigHeight || 768
        }
      />
    </div>
  );
};

export default ConfigLayout;
