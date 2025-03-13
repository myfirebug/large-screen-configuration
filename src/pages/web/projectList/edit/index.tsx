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
import { capitalizeFirstLetter, guid } from "@src/utils";
import { pageConfig, projectConfig } from "@src/core/config/base";
import "./index.scss";
import elements from "@src/elements";

import GridLayout from "@src/layout/gridLayout";
import { IElement, IWidget } from "@src/service";
import PreviewLayout from "@src/layout/previewLayout";
import Request from "@src/compoents/request";
import {
  WIDGET_BODY_COLUMN,
  WIDGET_BODY_GAP,
  WIDGET_BODY_ROW,
  WIDGET_HEADER_COLUMN,
  WIDGET_HEADER_GAP,
  WIDGET_HEADER_ROW,
} from "@src/core/enums/access.enums";
import { Layout } from "react-grid-layout";
import { Empty, Spin } from "antd";

interface IConfigLayout {}

const ConfigLayout: FC<IConfigLayout> = () => {
  let location = useLocation();
  const [layout, dispatch] = useReducer(projectReducer, initialState);
  const [, setShow] = useState(false);
  const [isShowAuxiliaryLine] = useState(true);

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
  // 当前选中的组件
  const currentElement = useMemo(() => {
    return currentWidget?.elements.find(
      (item) => layout?.elementId && item.elementId === layout?.elementId
    );
  }, [currentWidget?.elements, layout?.elementId]);
  // 渲染组件
  const renderElement = useCallback(
    (data: IAnyObject, realData?: IAnyObject) => {
      if (data.element && elements[capitalizeFirstLetter(data.element)]) {
        return React.createElement(
          elements[capitalizeFirstLetter(data.element)],
          {
            options: data.configuration.configureValue,
            data: data.configuration?.dataValue?.useInterface
              ? realData || {}
              : data.configuration?.dataValue?.mock,
            field: data.configuration?.dataValue?.field,
          }
        );
      }
      return <div>你访问的组件不存在请联系售后人员</div>;
    },
    []
  );
  // 渲染微件
  const renderWidget = useCallback(
    (data: IAnyObject) => {
      return (
        <>
          <Request
            method={data?.configuration?.dataValue?.method}
            url={data?.configuration?.dataValue?.url}
            params={JSON.stringify(
              data?.configuration?.dataValue?.params || {}
            )}
            render={(loading: boolean, success: boolean, realData: any) => {
              return (
                <>
                  {loading ? (
                    <Spin
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "tranlate(-50%, -50%)",
                        zIndex: 1000,
                      }}
                    />
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
                        configureValue={
                          currentPage?.configuration?.configureValue
                        }
                        column={WIDGET_HEADER_COLUMN}
                        row={WIDGET_HEADER_ROW}
                        gap={WIDGET_HEADER_GAP}
                        render={(data) => renderElement(data, realData)}
                        isDroppable
                        isResizable
                        staticed
                      />
                    }
                    body={
                      <GridLayout
                        configureValue={
                          currentPage?.configuration?.configureValue
                        }
                        datas={
                          data?.elements.filter(
                            (item: IElement) => item.position === "body"
                          ) || []
                        }
                        column={WIDGET_BODY_COLUMN}
                        row={WIDGET_BODY_ROW}
                        gap={WIDGET_BODY_GAP}
                        render={(data) => renderElement(data, realData)}
                        isDroppable
                        isResizable
                        staticed
                      />
                    }
                  />
                </>
              );
            }}
          />
        </>
      );
    },
    [currentPage?.configuration?.configureValue, renderElement]
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
        <ConfigLayoutMain>
          <div
            style={{
              position: "relative",
              width: `${
                layout?.project?.configuration?.configureValue
                  ?.pageConfigWidth || 1366
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
              <PreviewLayout
                data={layout?.project || {}}
                header={
                  <GridLayout
                    datas={
                      currentPage?.widgets?.filter(
                        (item) => item.position === "header"
                      ) || []
                    }
                    selectedId={layout?.widgetId}
                    render={renderWidget}
                    configureValue={
                      layout?.project?.configuration?.configureValue
                    }
                    row={1}
                    column={
                      layout?.project?.configuration?.configureValue
                        ?.horizontalNumber
                    }
                    onDrop={(item, data) => onDrop(item, data, "header")}
                    isDroppable={isShowAuxiliaryLine}
                    isResizable={isShowAuxiliaryLine}
                    staticed={!isShowAuxiliaryLine}
                    onDragStop={onDragStop}
                    onResizeStop={onResizeStop}
                    onClose={onClose}
                  />
                }
                body={
                  <GridLayout
                    datas={
                      currentPage?.widgets?.filter(
                        (item) => item.position === "body"
                      ) || []
                    }
                    selectedId={layout?.widgetId}
                    render={renderWidget}
                    configureValue={
                      layout?.project?.configuration?.configureValue
                    }
                    row={
                      layout?.project?.configuration?.configureValue
                        ?.verticalNumber
                    }
                    column={
                      layout?.project?.configuration?.configureValue
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
          </div>
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
    </div>
  );
};

export default ConfigLayout;
