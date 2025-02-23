import React, { FC, useCallback, useEffect, useState } from "react";
import { Form } from "antd";
import DynamicForm from "../dynamicForm";
import { elementDataConfig, widgetDataConfig } from "@src/core/config/base";
import { Tabs } from "antd";

import "./index.scss";

const { TabPane } = Tabs;

interface IConfigLayoutRightAsideData {
  widgetDataValue: IAnyObject;
  elementDataValue: IAnyObject;
  widgetOnFinish: (data: IAnyObject) => void;
  elementOnFinish: (data: IAnyObject) => void;
}

export const ConfigLayoutRightAsideData: FC<IConfigLayoutRightAsideData> = ({
  widgetDataValue,
  elementDataValue,
  widgetOnFinish,
  elementOnFinish,
}) => {
  const [elementForm] = Form.useForm();
  const [widgetForm] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");
  useEffect(() => {
    if (elementDataValue) {
      elementForm.setFieldsValue(elementDataValue);
      setActiveKey("1");
    } else {
      setActiveKey("2");
    }
  }, [elementDataValue, elementForm]);

  useEffect(() => {
    if (widgetDataValue) {
      widgetForm.setFieldsValue(widgetDataValue);
    }
  }, [widgetDataValue, widgetForm]);

  const onChange = useCallback(
    (key: string) => {
      if (elementDataValue) {
        setActiveKey(key);
      }
    },
    [elementDataValue]
  );

  return (
    <div className="cms-config-layout__data">
      <Tabs activeKey={activeKey} centered onChange={onChange}>
        <TabPane
          tabKey="1"
          tab="组件"
          key="1"
          disabled={!Boolean(elementDataValue)}
        >
          <Form layout="vertical" labelAlign="left" form={elementForm}>
            <DynamicForm
              datas={elementDataConfig.configure || []}
              form={elementForm}
              callback={(field: string, value: any) => {
                const val =
                  value && !isNaN(value) && typeof value !== "boolean"
                    ? Number(value)
                    : value;
                if (elementDataValue[field] !== val) {
                  elementOnFinish({
                    [field]: val,
                  });
                }
              }}
            />
          </Form>
        </TabPane>
        <TabPane
          tabKey="2"
          tab="微件"
          key="2"
          disabled={!Boolean(widgetDataValue)}
        >
          <Form layout="vertical" labelAlign="left" form={widgetForm}>
            <DynamicForm
              datas={widgetDataConfig.configure || []}
              form={widgetForm}
              callback={(field: string, value: any) => {
                const val =
                  value && !isNaN(value) && typeof value !== "boolean"
                    ? Number(value)
                    : value;
                if (widgetDataValue[field] !== val) {
                  widgetOnFinish({
                    [field]: val,
                  });
                }
              }}
            />
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};
