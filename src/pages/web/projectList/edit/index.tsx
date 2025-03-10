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
          pages: [
            {
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
          ],
          configuration: {
            configureValue: { ...projectConfig.configureValue },
          },
        },
      });
    }
  }, [location]);

  // 判断右侧边栏所需模块
  const rightAside = useMemo(() => {
    let arr: PageType[] = [];
    if (layout?.projectId) {
      if (layout?.pageId) {
        arr = ["layer", "page", "project"];
        if (layout?.widgetId) {
          if (layout?.elementId) {
            arr = ["layer", "element", "widget", "page", "project", "data"];
          } else {
            arr = ["layer", "widget", "page", "project", "data"];
          }
        } else {
          arr = ["layer", "page", "project"];
        }
      }
    } else {
      arr = ["layer"];
    }

    return arr;
  }, [layout?.elementId, layout?.pageId, layout?.projectId, layout?.widgetId]);

  // 图层选择
  const layerSelectedHandle = useCallback(
    (
      type: "page" | "widget" | "element" | "project",
      id: string,
      pid?: string
    ) => {},
    []
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
              configureValue={currentPage?.configuration?.configureValue}
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
              configureValue={currentPage?.configuration?.configureValue}
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
    [currentPage?.configuration?.configureValue, renderElement]
  );
  // 新增微件
  const onDrop = useCallback(
    (item: Layout, data: IWidget, type: "header" | "body") => {},
    []
  );
  // 修改微件
  const onDragStop = useCallback((item: Layout) => {}, []);
  // 改变大小
  const onResizeStop = useCallback((item: Layout) => {}, []);

  // 删除微件
  const onClose = useCallback((item: IAnyObject) => {}, []);

  return (
    <div className="cms-config-layout">
      <ConfigLayoutHeader
        name={layout?.project?.name}
        pageType="page"
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
                layout?.project?.configuration?.configureValue
                  ?.pageConfigWidth || 1366
              }px`,
              height: `${
                layout?.project?.configuration?.configureValue
                  ?.pageConfigHeight || 768
              }px`,
            }}
            id="js_project"
          >
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
                  configureValue={currentPage?.configuration?.configureValue}
                  row={1}
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
              body={
                <GridLayout
                  datas={
                    currentPage?.widgets?.filter(
                      (item) => item.position === "body"
                    ) || []
                  }
                  selectedId={layout?.widgetId}
                  render={renderWidget}
                  configureValue={currentPage?.configuration?.configureValue}
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
          </div>
        </ConfigLayoutMain>
        <ConfigLayoutRightAside
          navs={rightAside}
          render={(data) => {
            if (data === "layer") {
              return (
                <div>
                  <ConfigLayoutRightAsideLayer
                    datas={layout?.project ? [layout?.project] : []}
                    pageId={layout?.pageId}
                    widgetId={layout?.widgetId}
                    elementId={layout?.elementId}
                    projectId={layout?.projectId}
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
                  onFinish={(data: IAnyObject) => {}}
                />
              );
            } else if (data === "element") {
              return (
                <ConfigLayoutRightAsideElement
                  element={currentElement?.element}
                  configureValue={
                    currentElement?.configuration.configureValue || {}
                  }
                  onFinish={(data: IAnyObject) => {}}
                />
              );
            } else if (data === "data") {
              return (
                <ConfigLayoutRightAsideData
                  widgetDataValue={currentWidget?.configuration?.dataValue}
                  widgetOnFinish={(data: IAnyObject) => {}}
                  elementDataValue={currentElement?.configuration.dataValue}
                  elementOnFinish={(data: IAnyObject) => {}}
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
                  onFinish={(data) => {
                    dispatch({
                      type: "MODIFY_PROJECT",
                      data: {
                        configuration: {
                          ...layout?.project?.configuration,
                          configureValue: {
                            ...layout?.project?.configuration?.configureValue,
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
