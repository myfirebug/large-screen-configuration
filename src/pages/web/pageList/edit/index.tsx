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
} from "@src/layout/configLayout";

import "@src/layout/configLayout/index.scss";
import { initialState, pageReducer } from "./store/reducers";
import "animate.css";
import html2canvas from "html2canvas";
import { message } from "antd";
import { guid } from "@src/utils";
import { pageConfig } from "@src/core/config/base";
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
          widgets: [
            {
              id: "4dec31B8-52C9-13Ed-bd1C-9A33a744f5BF",
              name: "全市各区县严重污染企业数量",
              url: "",
              type: "table",
              createTime: "1989-05-13",
              count: 0,
              widgetId: "c67E80bB-54fe-85D9-fC1b-Eb5Cc38205E1",
              x: 0,
              y: 0,
              column: 1,
              row: 1,
              configuration: {
                configureValue: {
                  styleBoxInset: false,
                  styleBorderStyle: "solid",
                  styleBoxShadowC: "rgba(15, 32, 212, 0.5)",
                  styleBorderWidth: 1,
                  styleBorderColor: "rgb(15, 32, 212)",
                  styleBorderTopLeftRadius: 10,
                  styleBorderTopRightRadius: 10,
                  styleBorderBottomLeftRadius: 10,
                  styleBorderBottomRightRadius: 10,
                  styleBackgroundColor: "#090548",
                  headerStyleHeight: 40,
                  isShowAuxiliaryLine: true,
                  auxiliaryLineBorderColor: "rgba(255, 255, 255, 0.2)",
                  headerStyleBorderBottomColor: "rgb(15, 32, 212)",
                  bodyStylePaddingTop: 4,
                  headerShow: true,
                },
                dataValue: {
                  dataType: "mock",
                  mock: { value: "文本框" },
                  params: {},
                  method: "get",
                  field: "value",
                },
              },
              elements: [
                {
                  id: "fEA2CBc3-5A8b-fF1E-2A3d-bFAE5BBeA171",
                  name: "带进度条表格",
                  url: "",
                  element: "table",
                  code: "progressTable",
                  type: "table",
                  createTime: "2024-07-10",
                  count: "33274",
                  x: 1,
                  y: 1,
                  row: 8,
                  column: 8,
                  show: false,
                  elementId: "6c2f8ee2=9507=4dfa=a290=5a3b07edeb71",
                  position: "body",
                  configuration: {
                    configureValue: {
                      loop: true,
                      pagination: true,
                      autoplay: true,
                      navigation: false,
                      spaceBetween: 0,
                      slidesPerView: 9,
                      rows: 1,
                      tableHeaderBackgroudColor: "#4a8cff",
                      tableHeaderColor: "#fff",
                      tableShowBorderColor: "rgba(230,30,30,1)",
                      tableShowHeader: false,
                      tableTbodyColor: "#fff",
                      tableColumn: [
                        {
                          title: "序号",
                          dataIndex: "index",
                          align: "left",
                          width: 30,
                        },
                        {
                          title: "地区",
                          dataIndex: "name",
                          align: "left",
                          width: 60,
                        },
                        {
                          title: "占比",
                          dataIndex: "progressBar",
                          align: "left",
                          components: "progress",
                        },
                        {
                          title: "用电量",
                          dataIndex: "data",
                          align: "right",
                          width: 80,
                        },
                      ],
                      serialNumberRank: true,
                      tableTbodyOddBackgroundColor: "",
                      serialNumberBackgroundColor: "rgb(74, 140, 255)",
                      serialNumberFontSize: 12,
                      progressForegroundColor: "#4abbff",
                      progressBackgroundColor: "rgba(74, 187, 255, 0.1)",
                    },
                    dataValue: {
                      useInterface: false,
                      mock: {
                        table: [
                          {
                            name: "右玉县",
                            data: "902,381",
                            progressBar: "50%",
                          },
                          {
                            name: "逆城区",
                            data: "902,381",
                            progressBar: "50%",
                          },
                          {
                            name: "平鲁工",
                            data: "902,381",
                            progressBar: "50%",
                          },
                          {
                            name: "怀仁市",
                            data: "902,381",
                            progressBar: "50%",
                          },
                          {
                            name: "山阴县",
                            data: "902,381",
                            progressBar: "50%",
                          },
                          { name: "应县", data: "902,381", progressBar: "50%" },
                          {
                            name: "武侯区",
                            data: "902,381",
                            progressBar: "50%",
                          },
                          {
                            name: "高新区",
                            data: "902,381",
                            progressBar: "50%",
                          },
                          {
                            name: "双流区",
                            data: "902,381",
                            progressBar: "50%",
                          },
                          {
                            name: "青羊区",
                            data: "902,381",
                            progressBar: "50%",
                          },
                        ],
                      },
                      field: "table",
                    },
                  },
                  pageX: 447,
                  pageY: 200,
                },
                {
                  id: "1cAC8EaB-0edc-eEdA-eaf1-23ECC8D6f58F",
                  name: "带icon文本",
                  url: "",
                  element: "baseText",
                  code: "iconText",
                  type: "text",
                  createTime: "1982-06-20",
                  count: "29016",
                  x: 1,
                  y: 1,
                  row: 1,
                  column: 4,
                  show: false,
                  elementId: "854b3194=8261=4d58=93f6=6250e731608c",
                  position: "header",
                  configuration: {
                    configureValue: {
                      iconStyleFontSize: 18,
                      iconStyleSelect: "&#xe621",
                      styleBoxInset: false,
                      styleBorderStyle: "none",
                      styleFontSize: 18,
                      styleFontWeight: "bolder",
                      styleTextAlign: "left",
                      styleFontFamily: "Microsoft YaHei",
                      styleLineHeight: 40,
                      styleColor: "#fff",
                      styleLetterSpacing: "",
                      iconStyleColor: "#0091ff",
                    },
                    dataValue: {
                      useInterface: false,
                      mock: { value: "全市各区县严重污染企业数量" },
                      field: "value",
                    },
                  },
                },
              ],
            },
          ],
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

  const onSelected = useCallback(
    (type: "page" | "widget" | "element", id: string, pid?: string) => {
      switch (type) {
        case "widget":
          dispatch({
            type: "SELECT_WIDGET",
            widgetId: id,
          });
          break;
        case "element":
          dispatch({
            type: "SELECT_ELEMENT",
            widgetId: pid as string,
            elementId: id,
          });
          break;
        default:
      }
    },
    []
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
  return (
    <div className="cms-config-layout">
      <ConfigLayoutHeader
        name={layout?.page?.name}
        pageType="page"
        modifyNameSuccessHander={(name) => {}}
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
        <ConfigLayoutMain>123</ConfigLayoutMain>
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
                    onSelected={onSelected}
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
                  configureValue={layout?.page?.configuration?.configureValue}
                  onFinish={(data) => {
                    console.log(data);
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
