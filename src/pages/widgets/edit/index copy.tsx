import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  ConfigLayoutRightAsideData,
  ConfigLayoutMask,
} from "@src/layout/configLayout";

import { widgetConfig } from "@src/core/config/base";

import "@src/layout/configLayout/index.scss";
import WidgetLayout from "@src/layout/widgetLayout";
import { initialState, widgetReducer } from "./store/reducers";
import { IElement, IWidget } from "@src/service";
import { capitalizeFirstLetter, guid, getStyles } from "@src/utils";
import "animate.css";
import {
  CACHE_WIDGETS,
  ELEMETSTYPE,
  WIDGET_BODY_COLUMN,
  WIDGET_BODY_GAP,
  WIDGET_BODY_ROW,
  WIDGET_HEADER_COLUMN,
  WIDGET_HEADER_GAP,
  WIDGET_HEADER_ROW,
} from "@src/core/enums/access.enums";
import WidgetPreviewDialog from "@src/compoents/widgetPreviewDialog";
import localforage from "localforage";
import html2canvas from "html2canvas";
import { Button, Form, message, Modal, Select } from "antd";
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

  const renderPreview = useCallback(
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
  // 判断右侧边栏所需模块
  const rightAside = useMemo(() => {
    let arr: PageType[] = [];
    if (layout?.widgetId) {
      if (layout?.elementId) {
        arr = ["layer", "element", "data"];
      } else {
        arr = ["layer", "data"];
      }
    } else {
      arr = ["layer"];
    }
    return arr;
  }, [layout?.elementId, layout?.widgetId]);

  const onSelected = useCallback(
    (type: "page" | "widget" | "element", id: string) => {
      if (type === "element" && id && layout?.elementId !== id) {
        dispatch({
          type: "SELECT_ELEMENT",
          id: id,
        });
      }
    },
    [layout?.elementId]
  );
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
  const onFinish = (values: any) => {
    message.success("发布成功");
    navigate(-1);
    console.log(
      JSON.stringify({
        ...layout?.widget,
        ...values,
      })
    );
  };

  const currentElement = useMemo(() => {
    return layout?.widget.elements.find(
      (item) => item.elementId === layout?.elementId
    );
  }, [layout?.elementId, layout?.widget.elements]);

  const onChnage = useCallback((data: PageType | "") => {
    dispatch({
      type: "SELECTED_TYPE",
      data,
    });
  }, []);

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
        <ConfigLayoutMain>
          <WidgetLayout
            id="js_widget"
            style={getStyles(
              layout?.widget?.configuration?.configureValue || {}
            )}
            headerStyles={{
              ...getStyles(
                layout?.widget?.configuration?.configureValue || {},
                "headerStyle"
              ),
              display: layout?.widget?.configuration?.configureValue?.headerShow
                ? "block"
                : "none",
            }}
            bodyStyles={getStyles(
              layout?.widget?.configuration?.configureValue || {},
              "bodyStyle"
            )}
            header={
              <DragContent
                auxiliaryLineConfig={{
                  show: isShowAuxiliaryLine,
                  borderColor:
                    layout?.widget?.configuration?.configureValue
                      ?.auxiliaryLineBorderColor,
                }}
                column={WIDGET_HEADER_COLUMN}
                row={WIDGET_HEADER_ROW}
                gap={WIDGET_HEADER_GAP}
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
                  show: isShowAuxiliaryLine,
                  borderColor:
                    layout?.widget?.configuration?.configureValue
                      ?.auxiliaryLineBorderColor,
                }}
                column={WIDGET_BODY_COLUMN}
                row={WIDGET_BODY_ROW}
                gap={WIDGET_BODY_GAP}
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
            } else if (data === "data") {
              return (
                <ConfigLayoutRightAsideData
                  widgetDataValue={layout?.widget?.configuration?.dataValue}
                  widgetOnFinish={(data: IAnyObject) => {
                    const widget = layout?.widget;
                    console.log(widget, "123");
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
            return <div>{data}</div>;
          }}
          onChange={onChnage}
        />
      </div>

      <WidgetPreviewDialog
        open={show}
        onClose={() => setShow(false)}
        data={layout?.widget as IWidget}
      />
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
