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
  ConfigLayoutLeftAsideElements,
  ConfigLayoutRightAsideLayer,
  ConfigLayoutRightAsideWidget,
  ConfigLayoutRightAsideElement,
  ConfigLayoutRightAsideData,
} from "@src/layout/configLayout";

import { widgetConfig } from "@src/core/config/base";

import "@src/layout/configLayout/index.scss";
import { initialState, widgetReducer } from "./store/reducers";
import { IElement, IWidget } from "@src/service";
import { guid } from "@src/utils";
import "animate.css";
import { CACHE_WIDGETS, ELEMETSTYPE } from "@src/core/enums/access.enums";
import localforage from "localforage";
import html2canvas from "html2canvas";
import { Button, Form, message, Modal, Select } from "antd";
import { Layout } from "react-grid-layout";

import RenderWidget from "@src/compoents/renderWidget";
import PreviewDialog from "@src/compoents/previewDialog";
interface IConfigLayout {}

const ConfigLayout: FC<IConfigLayout> = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [layout, dispatch] = useReducer(widgetReducer, initialState);
  const [show, setShow] = useState(false);
  const [isShowAuxiliaryLine, setIsShowAuxiliaryLine] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // 编辑
    if (queryParams.size) {
      const widgetId = queryParams.get("widgetId");
      if (widgetId) {
        localforage.getItem(CACHE_WIDGETS, (err, value) => {
          if (value) {
            const curr = (value as IWidget[]).find(
              (item) => item.widgetId === widgetId
            );
            if (curr) {
              dispatch({
                type: "WIDGET",
                data: curr,
              });
            } else {
              console.log("找不到微件ID");
            }
          }
        });
      }
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
          configuration: {
            configureValue: widgetConfig.configureValue,
            dataValue: widgetConfig.dataValue,
          },
          elements: [],
        },
      });
    }
  }, [location]);

  // 编辑组件
  const onDragStop = useCallback((item: Layout) => {
    dispatch({
      type: "MODIFY_ELEMENT",
      data: {
        x: item.x,
        y: item.y,
        elementId: item.i,
      },
    });
  }, []);
  // 改变组件大小
  const onResizeStop = useCallback((item: Layout) => {
    dispatch({
      type: "MODIFY_ELEMENT",
      data: {
        row: item.w,
        column: item.h,
        elementId: item.i,
      },
    });
  }, []);
  // 新增组件
  const onDrop = useCallback(
    (item: Layout, data: IAnyObject, position: "header" | "body") => {
      dispatch({
        type: "ADD_ELEMENT",
        data: {
          ...data,
          x: item.x,
          y: item.y,
          position: position,
          elementId: guid(),
        } as IElement,
      });
    },
    []
  );
  // 判断右侧边栏所需模块
  const rightAside = useMemo(() => {
    let arr: PageType[] = [];
    if (layout?.widgetId) {
      if (layout?.elementId) {
        arr = ["layer", "element", "widget", "data"];
      } else {
        arr = ["layer", "widget", "data"];
      }
    } else {
      arr = ["layer", "widget"];
    }
    return arr;
  }, [layout?.elementId, layout?.widgetId]);
  // 选中组件
  const onSelected = useCallback(
    (type: "page" | "widget" | "element" | "project", id: string) => {
      if (type === "element" && id && layout?.elementId !== id) {
        dispatch({
          type: "SELECT_ELEMENT",
          id: id,
        });
      }
    },
    [layout?.elementId]
  );
  // 组件类型
  const types = useMemo(() => {
    let arr: any[] = [];
    for (let field in ELEMETSTYPE) {
      arr.push({
        label: ELEMETSTYPE[field],
        value: field,
      });
    }
    return arr;
  }, []);
  // 发布
  const onFinish = (values: any) => {
    message.success("发布成功");
    dispatch({
      type: "SELECT_ELEMENT",
      id: "",
    });
    navigate(-1);
    console.log(
      JSON.stringify({
        ...layout?.widget,
        ...values,
      })
    );
  };
  // 当前选中微件
  const currentWidget = useMemo(() => {
    return layout?.widget;
  }, [layout?.widget]);
  // 当前选中组件
  const currentElement = useMemo(() => {
    return currentWidget?.elements.find(
      (item) => item.elementId === layout?.elementId
    );
  }, [layout?.elementId, currentWidget]);

  // 删除组件
  const onClose = useCallback((item: IAnyObject) => {
    dispatch({
      type: "DELETE_ELEMENT",
      id: item.elementId,
    });
  }, []);

  // 删除组件
  const onDeleteHandler = useCallback(
    (
      type: "page" | "widget" | "element" | "project",
      id: string,
      pid?: string
    ) => {
      if (type === "element") {
        dispatch({
          type: "DELETE_ELEMENT",
          id,
        });
      }
    },
    []
  );
  // 修改组件
  const onEditHandler = useCallback(
    (
      type: "page" | "widget" | "element" | "project",
      id: string,
      name: string,
      pid?: string
    ) => {
      if (type === "element") {
        dispatch({
          type: "MODIFY_ELEMENT",
          data: { name, elementId: id },
        });
      }
    },
    []
  );

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

  return (
    <div className="cms-config-layout">
      <ConfigLayoutHeader
        logo="&#xe634;"
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
        previewHandler={() => setShow(true)}
        publishHandler={() => {
          setIsShowAuxiliaryLine(false);
          setTimeout(() => {
            html2canvas(document.getElementById("js_widget") as HTMLElement, {
              allowTaint: true,
              scale: 0.5,
              backgroundColor: "rgb(9, 5, 72)",
            }).then((canvas) => {
              try {
                dispatch({
                  type: "MODIFY_WIDGET",
                  data: {
                    url: canvas?.toDataURL(),
                  },
                });
              } catch (e) {
                message.error("存在跨域资源，缩略图获取失败");
              }
            });
          }, 10);
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
        <ConfigLayoutMain
          style={{
            position: "relative",
            width: `${
              currentWidget?.configuration?.configureValue?.widgetConfigWidth ||
              600
            }px`,
            height: `${
              currentWidget?.configuration?.configureValue
                ?.widgetConfigHeight || 400
            }px`,
          }}
          id="js_widget"
        >
          <RenderWidget
            data={currentWidget as IWidget}
            configureValue={currentWidget?.configuration?.configureValue}
            onDrop={onDrop}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            isDroppable={isShowAuxiliaryLine}
            isResizable={isShowAuxiliaryLine}
            staticed={!isShowAuxiliaryLine}
            onClose={onClose}
            selectedId={layout?.elementId}
            onChangeParams={(data) => {
              console.log(data, "data");
            }}
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
                  pageType="element"
                  onDeleteHandler={onDeleteHandler}
                  onEditHandler={onEditHandler}
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
            } else if (data === "data") {
              return (
                <ConfigLayoutRightAsideData
                  isShowWidgetDataConfig
                  paramFields={
                    currentElement?.type === "form"
                      ? currentWidgetParamFields
                      : []
                  }
                  widgetDataValue={layout?.widget?.configuration?.dataValue}
                  widgetOnFinish={(data: IAnyObject) => {
                    const widget = layout?.widget;
                    dispatch({
                      type: "MODIFY_WIDGET",
                      data: {
                        ...widget,
                        configuration: {
                          ...widget?.configuration,
                          dataValue: {
                            ...widget?.configuration?.dataValue,
                            ...data,
                          },
                        },
                      },
                    });
                  }}
                  elementDataValue={currentElement?.configuration.dataValue}
                  elementOnFinish={(data: IAnyObject) => {
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
                            dataValue: {
                              ...currentElement.configuration.dataValue,
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
            return null;
          }}
        />
      </div>

      {/* 预览功能 */}
      <PreviewDialog
        open={show}
        onClose={() => setShow(false)}
        title="微件预览"
        width={
          currentWidget?.configuration?.configureValue?.pageConfigWidth || 600
        }
        height={
          currentWidget?.configuration?.configureValue?.pageConfigHeight || 400
        }
      >
        <RenderWidget
          data={currentWidget as IWidget}
          configureValue={currentWidget?.configuration?.configureValue}
          isDroppable={true}
          isResizable={true}
          staticed={true}
          onChangeParams={(data, widgetId) => {
            console.log(data, widgetId, "data");
            dispatch({
              type: "MODIFY_WIDGET",
              data: {
                ...currentWidget,
                configuration: {
                  ...currentWidget?.configuration,
                  dataValue: {
                    ...currentWidget?.configuration?.dataValue,
                    params: {
                      ...currentWidget?.configuration?.dataValue?.params,
                      ...data,
                    },
                  },
                },
              },
            });
          }}
        />
      </PreviewDialog>
      {/* 发布功能 */}
      <Modal
        open={!isShowAuxiliaryLine}
        title="发布微件"
        footer={null}
        width={400}
        maskClosable={false}
        onCancel={() => setIsShowAuxiliaryLine(true)}
      >
        <Form
          autoComplete="off"
          initialValues={layout?.widget}
          labelCol={{ flex: "60px" }}
          onFinish={onFinish}
        >
          <Form.Item<any> name="name" label="微件名称">
            <Form.Item<any> noStyle>{layout?.widget?.name}</Form.Item>
          </Form.Item>
          <Form.Item<any> name="url" label="缩略图">
            <Form.Item<any> noStyle>
              <img
                src={layout?.widget?.url as string}
                alt="缩略图"
                style={{ borderRadius: "5px", width: "100%" }}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item<any>
            name="type"
            label="类型"
            rules={[{ required: true, message: "请选择类型" }]}
          >
            <Select showSearch placeholder="请选择类型" options={types} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              发布
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConfigLayout;
