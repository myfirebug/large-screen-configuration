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
import { capitalizeFirstLetter, guid } from "@src/utils";
import { pageConfig } from "@src/core/config/base";
import "./index.scss";
import elements from "@src/elements";

import GridLayout from "@src/layout/gridLayout";
import { IElement, IPage, IWidget } from "@src/service";
import PreviewLayout from "@src/layout/previewLayout";
import {
  CACHE_PAGES,
  WIDGET_BODY_COLUMN,
  WIDGET_BODY_GAP,
  WIDGET_BODY_ROW,
  WIDGET_HEADER_COLUMN,
  WIDGET_HEADER_GAP,
  WIDGET_HEADER_ROW,
} from "@src/core/enums/access.enums";
import { Layout } from "react-grid-layout";
import localforage from "localforage";

interface IConfigLayout {}

const ConfigLayout: FC<IConfigLayout> = () => {
  let location = useLocation();
  const [layout, dispatch] = useReducer(pageReducer, initialState);
  const [, setShow] = useState(false);
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
          arr = ["layer", "widget", "page"];
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

  // 渲染组件
  const renderElement = useCallback((data: IAnyObject) => {
    console.log("element update", data.elementId);
    if (data.element && elements[capitalizeFirstLetter(data.element)]) {
      return React.createElement(
        elements[capitalizeFirstLetter(data.element)],
        {
          options: data.configuration.configureValue,
          data: data.configuration?.dataValue?.mock,
          field: data.configuration?.dataValue?.field,
        }
      );
    }
    return <div>你访问的组件不存在请联系售后人员</div>;
  }, []);
  // 渲染微件
  const renderWidget = useCallback(
    (data: IAnyObject) => {
      return (
        <PreviewLayout
          data={data}
          header={
            <GridLayout
              datas={
                data?.elements.filter(
                  (item: IElement) => item.position === "header"
                ) || []
              }
              configureValue={layout?.page?.configuration?.configureValue}
              column={WIDGET_HEADER_COLUMN}
              row={WIDGET_HEADER_ROW}
              gap={WIDGET_HEADER_GAP}
              render={renderElement}
              isDroppable
              isResizable
              staticed
            />
          }
          body={
            <GridLayout
              configureValue={layout?.page?.configuration?.configureValue}
              datas={
                data?.elements.filter(
                  (item: IElement) => item.position === "body"
                ) || []
              }
              column={WIDGET_BODY_COLUMN}
              row={WIDGET_BODY_ROW}
              gap={WIDGET_BODY_GAP}
              render={renderElement}
              isDroppable
              isResizable
              staticed
            />
          }
        />
      );
    },
    [layout?.page?.configuration?.configureValue, renderElement]
  );
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
        <ConfigLayoutMain>
          <div
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
            <PreviewLayout
              data={layout?.page || {}}
              header={null}
              body={
                <GridLayout
                  datas={
                    layout?.page?.widgets?.filter(
                      (item) => item.position === "body"
                    ) || []
                  }
                  selectedId={layout?.widgetId}
                  render={renderWidget}
                  configureValue={layout?.page?.configuration?.configureValue}
                  row={
                    layout?.page?.configuration?.configureValue?.verticalNumber
                  }
                  column={
                    layout?.page?.configuration?.configureValue
                      ?.horizontalNumber
                  }
                  onDrop={(item, data) => onDrop(item, data, "body")}
                  isDroppable={isShowAuxiliaryLine}
                  isResizable={isShowAuxiliaryLine}
                  staticed={!isShowAuxiliaryLine}
                  onDragStop={onDragStop}
                  onResizeStop={onResizeStop}
                  onClose={onClose}
                />
              }
            />
          </div>
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
    </div>
  );
};

export default ConfigLayout;
