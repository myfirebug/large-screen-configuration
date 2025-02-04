import React, { FC, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import ConfigLayoutHeader from "@src/layout/configLayout/components/header";
import ConfigLayoutLeftAside from "@src/layout/configLayout/components/leftAside";
import ConfigLayoutRightAside from "@src/layout/configLayout/components/rightAside";
import ConfigLayoutMain from "@src/layout/configLayout/components/main";
import ConfigLayoutLeftAsideElements from "@src/layout/configLayout/components/elements";
import DragContent from "@src/compoents/dragdrop/dragContent";

import "@src/layout/configLayout/index.scss";
import WidgetLayout from "@src/layout/widgetLayout";
import { initialState, widgetReducer } from "./store/reducers";
interface IConfigLayout {}

const ConfigLayout: FC<IConfigLayout> = () => {
  let location = useLocation();
  const [layout, dispatch] = useReducer(widgetReducer, initialState);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // 编辑
    if (queryParams) {
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
          configuration: {},
          header: [],
          body: [],
        },
      });
    }
  }, [location]);
  console.log(layout, dispatch);
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
            header={
              <DragContent column={8} row={1} gap={4} groupName="elements" />
            }
            body={
              <DragContent column={8} row={8} gap={4} groupName="elements" />
            }
          />
        </ConfigLayoutMain>
        <ConfigLayoutRightAside
          navs={["layer", "element", "widget"]}
          render={(data) => {
            return <div>{data}</div>;
          }}
        />
      </div>
    </div>
  );
};

export default ConfigLayout;
