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
  ConfigLayoutMask,
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
import { IElement, IWidget } from "@src/service";
import PreviewLayout from "@src/layout/previewLayout";
import {
  WIDGET_BODY_COLUMN,
  WIDGET_BODY_GAP,
  WIDGET_BODY_ROW,
  WIDGET_HEADER_COLUMN,
  WIDGET_HEADER_GAP,
  WIDGET_HEADER_ROW,
} from "@src/core/enums/access.enums";
import { Layout } from "react-grid-layout";

interface IConfigLayout {}

const ConfigLayout: FC<IConfigLayout> = () => {
  let location = useLocation();
  const [layout, dispatch] = useReducer(pageReducer, initialState);
  const [, setShow] = useState(false);
  const [, setIsShowAuxiliaryLine] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // 编辑
    if (queryParams.size) {
    } else {
      dispatch({
        type: "PAGE",
        data: {
          name: "未命名页面",
          id: "",
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
    (type: "page" | "widget" | "element", id: string, pid?: string) => {
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
  const renderElement = useCallback(
    (data: IAnyObject) => {
      if (data.element && elements[capitalizeFirstLetter(data.element)]) {
        return (
          <>
            {layout?.elementId === data.elementId &&
            layout?.selectedType === "element" ? (
              <ConfigLayoutMask />
            ) : null}
            {React.createElement(
              elements[capitalizeFirstLetter(data.element)],
              {
                options: data.configuration.configureValue,
                data: data.configuration?.dataValue?.mock,
                field: data.configuration?.dataValue?.field,
              }
            )}
          </>
        );
      }
      return <div>你访问的组件不存在请联系售后人员</div>;
    },
    [layout?.elementId, layout?.selectedType]
  );
  // 渲染微件
  const renderWidget = useCallback(
    (data: IAnyObject) => {
      return (
        <>
          {layout?.widgetId === data.widgetId &&
          layout?.selectedType &&
          ["widget", "data"].includes(layout?.selectedType) ? (
            <ConfigLayoutMask />
          ) : null}
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
        </>
      );
    },
    [
      layout?.page?.configuration?.configureValue,
      layout?.selectedType,
      layout?.widgetId,
      renderElement,
    ]
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
          elements: data?.elements?.map((element) => ({
            ...element,
            elementId: guid(),
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

  // 改变
  const onChange = useCallback((data: PageType | "") => {
    dispatch({
      type: "SELECTED_TYPE",
      data,
    });
  }, []);

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
          setIsShowAuxiliaryLine(false);
          setTimeout(() => {
            html2canvas(document.getElementById("js_page") as HTMLElement, {
              allowTaint: true,
              scale: 0.5,
              backgroundColor: "rgb(9, 5, 72)",
            }).then((canvas) => {
              try {
                console.log(canvas.toDataURL());
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
              width: `${layout?.page?.configuration?.configureValue?.pageConfigWidth}px`,
              height: `${layout?.page?.configuration?.configureValue?.pageConfigHeight}px`,
            }}
            id="js_page"
          >
            <PreviewLayout
              data={layout?.page || {}}
              header={
                <GridLayout
                  datas={
                    layout?.page?.widgets?.filter(
                      (item) => item.position === "header"
                    ) || []
                  }
                  render={renderWidget}
                  configureValue={layout?.page?.configuration?.configureValue}
                  row={1}
                  column={
                    layout?.page?.configuration?.configureValue
                      ?.horizontalNumber
                  }
                  onDrop={(item, data) => onDrop(item, data, "header")}
                  onDragStop={onDragStop}
                  onResizeStop={onResizeStop}
                  onClose={onClose}
                />
              }
              body={
                <GridLayout
                  datas={
                    layout?.page?.widgets?.filter(
                      (item) => item.position === "body"
                    ) || []
                  }
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
          onChange={onChange}
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
