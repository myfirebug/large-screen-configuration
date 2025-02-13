import React, { FC, useCallback, useEffect, useMemo, useReducer } from "react";
import { useLocation } from "react-router-dom";
import DragContent from "@src/compoents/dragdrop/dragContent";
import elements from "@src/elements";
import {
  ConfigLayoutHeader,
  ConfigLayoutMain,
  ConfigLayoutLeftAside,
  ConfigLayoutRightAside,
  ConfigLayoutLeftAsideElements,
  ConfigLayoutRightAsideLayer,
  ConfigLayoutRightAsideWidget,
  ConfigLayoutRightAsideElement,
} from "@src/layout/configLayout";

import "@src/layout/configLayout/index.scss";
import WidgetLayout from "@src/layout/widgetLayout";
import { initialState, widgetReducer } from "./store/reducers";
import { IElement } from "@src/service";
import { capitalizeFirstLetter, guid, getStyles } from "@src/utils";
import "animate.css";
interface IConfigLayout {}

const ConfigLayout: FC<IConfigLayout> = () => {
  let location = useLocation();
  const [layout, dispatch] = useReducer(widgetReducer, initialState);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // 编辑
    if (queryParams.size) {
    } else {
      // 新增
      dispatch({
        type: "WIDGET",
        data: {
          name: "未命名微件",
          url: "",
          id: "",
          createTime: "",
          type: "text",
          count: 0,
          x: 0,
          y: 0,
          column: 1,
          row: 1,
          widgetId: guid(),
          configuration: {},
          elements: [],
        },
      });
    }
  }, [location]);

  const onDropHandler = (
    position: "header" | "body",
    isAdd: boolean,
    data: IAnyObject
  ) => {
    // 新增
    if (isAdd) {
      dispatch({
        type: "ADD_ELEMENT",
        data: {
          ...data,
          position: position,
        } as IElement,
      });
    } else {
      dispatch({
        type: "MODIFY_ELEMENT",
        data: {
          ...data,
          position: position,
        } as IElement,
      });
    }
  };

  const onResizeEndHandler = useCallback((data: IAnyObject) => {
    dispatch({
      type: "MODIFY_ELEMENT",
      data: { ...data },
    });
  }, []);

  const onCloseHander = useCallback((id: string) => {
    console.log(id, "onCloseHander");
    dispatch({
      type: "DELETE_ELEMENT",
      id,
    });
  }, []);

  const renderPreview = useCallback((data: IAnyObject) => {
    if (data.element && elements[capitalizeFirstLetter(data.element)]) {
      return React.createElement(
        elements[capitalizeFirstLetter(data.element)],
        {
          options: data.configuration.configureValue,
          data: data.configuration.dataValue.mock,
          field: data.configuration.dataValue.field,
        }
      );
    }
    return <div>你访问的组件不存在请联系售后人员</div>;
  }, []);
  // 判断右侧边栏所需模块
  const rightAside = useMemo(() => {
    let arr: PageType[] = [];
    if (layout?.widgetId) {
      if (layout?.elementId) {
        arr = ["layer", "element", "widget", "data", "linkage"];
      } else {
        arr = ["layer", "widget", "data", "linkage"];
      }
    } else {
      arr = ["layer"];
    }
    return arr;
  }, [layout?.elementId, layout?.widgetId]);

  const onSelected = useCallback(
    (widgetId: string, elementId: string | undefined) => {
      if (elementId && layout?.elementId !== elementId) {
        dispatch({
          type: "SELECT_ELEMENT",
          id: elementId,
        });
      }
    },
    [layout?.elementId]
  );

  const currentElement = useMemo(() => {
    return layout?.widget.elements.find(
      (item) => item.elementId === layout?.elementId
    );
  }, [layout?.elementId, layout?.widget.elements]);

  return (
    <div className="cms-config-layout">
      <ConfigLayoutHeader
        name={layout?.widget.name}
        pageType="widget"
        modifyNameSuccessHander={(name) => {
          dispatch({
            type: "MODIFY_WIDGET",
            data: {
              name: name,
            },
          });
        }}
      />
      <div className="cms-config-layout__content">
        <ConfigLayoutLeftAside
          navs={["element"]}
          render={(data) => {
            if (data === "element") {
              return <ConfigLayoutLeftAsideElements />;
            }
            return null;
          }}
        />
        <ConfigLayoutMain>
          <WidgetLayout
            style={getStyles(
              layout?.widget?.configuration?.configureValue || {}
            )}
            headerStyles={getStyles(
              layout?.widget?.configuration?.configureValue || {},
              "headerStyle"
            )}
            bodyStyles={getStyles(
              layout?.widget?.configuration?.configureValue || {},
              "bodyStyle"
            )}
            header={
              <DragContent
                auxiliaryLineConfig={{
                  show: layout?.widget?.configuration?.configureValue
                    ?.isShowAuxiliaryLine,
                  borderColor:
                    layout?.widget?.configuration?.configureValue
                      ?.auxiliaryLineBorderColor,
                }}
                column={8}
                row={1}
                gap={4}
                groupName="elements"
                field="elementId"
                datas={
                  layout?.widget.elements.filter(
                    (item) => item.position === "header"
                  ) || []
                }
                onDropHandler={(isAdd, data) =>
                  onDropHandler("header", isAdd, data)
                }
                onResizeEndHandler={onResizeEndHandler}
                onCloseHander={onCloseHander}
                renderPreview={renderPreview}
              />
            }
            body={
              <DragContent
                auxiliaryLineConfig={{
                  show: layout?.widget?.configuration?.configureValue
                    ?.isShowAuxiliaryLine,
                  borderColor:
                    layout?.widget?.configuration?.configureValue
                      ?.auxiliaryLineBorderColor,
                }}
                column={8}
                row={8}
                gap={4}
                groupName="elements"
                field="elementId"
                datas={
                  layout?.widget.elements.filter(
                    (item) => item.position === "body"
                  ) || []
                }
                onDropHandler={(isAdd, data) =>
                  onDropHandler("body", isAdd, data)
                }
                onResizeEndHandler={onResizeEndHandler}
                onCloseHander={onCloseHander}
                renderPreview={renderPreview}
              />
            }
          />
        </ConfigLayoutMain>
        <ConfigLayoutRightAside
          navs={rightAside}
          render={(data) => {
            if (data === "layer") {
              return (
                <ConfigLayoutRightAsideLayer
                  datas={layout?.widget ? [layout?.widget] : []}
                  widgetId={layout?.widgetId}
                  elementId={layout?.elementId}
                  onSelected={onSelected}
                />
              );
            } else if (data === "widget") {
              return (
                <ConfigLayoutRightAsideWidget
                  configureValue={
                    (layout?.widget?.configuration
                      ?.configureValue as IAnyObject) || {}
                  }
                  onFinish={(data: IAnyObject) => {
                    const configuration = JSON.parse(
                      JSON.stringify(layout?.widget?.configuration)
                    );
                    dispatch({
                      type: "MODIFY_WIDGET",
                      data: {
                        configuration: {
                          ...configuration,
                          configureValue: {
                            ...configuration.configureValue,
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
                    const currentElement = JSON.parse(
                      JSON.stringify(
                        layout?.widget?.elements.find(
                          (item) => item.elementId === layout.elementId
                        )
                      )
                    );
                    if (currentElement) {
                      dispatch({
                        type: "MODIFY_ELEMENT",
                        data: {
                          ...currentElement,
                          configuration: {
                            ...currentElement.configuration,
                            configureValue: {
                              ...currentElement.configuration.configureValue,
                              ...data,
                            },
                          },
                        },
                      });
                    }
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
