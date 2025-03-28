import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, Form, Select, Switch } from "antd";
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
  isShowWidgetDataConfig?: boolean;
  paramFields?: string[];
}

export const ConfigLayoutRightAsideData: FC<IConfigLayoutRightAsideData> = ({
  widgetDataValue,
  elementDataValue,
  widgetOnFinish,
  elementOnFinish,
  isShowWidgetDataConfig,
  paramFields,
}) => {
  const [elementForm] = Form.useForm();
  const [widgetForm] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");
  useEffect(() => {
    if (elementDataValue) {
      setActiveKey("1");
    } else {
      setActiveKey("2");
    }
  }, [elementDataValue]);

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
          <Form
            layout="vertical"
            labelAlign="left"
            form={elementForm}
            initialValues={elementDataValue}
            onFinish={elementOnFinish}
          >
            {isShowWidgetDataConfig ? (
              <Form.Item
                label="使用微件数据"
                name="useInterface"
                tooltip="该组件使用微件的接口数据"
                valuePropName="checked"
              >
                <Switch size="small" />
              </Form.Item>
            ) : null}
            <DynamicForm
              formSubmit
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
            {paramFields?.length ? (
              <Form.Item
                label="接口参数字段"
                name="paramName"
                tooltip="从组组件的参数中选择"
              >
                <Select placeholder="请选择">
                  {paramFields.map((item) => (
                    <Select.Option key={item}>{item}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : null}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                保存
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        {isShowWidgetDataConfig ? (
          <TabPane
            tabKey="2"
            tab="微件"
            key="2"
            disabled={!Boolean(widgetDataValue)}
          >
            <Form
              layout="vertical"
              labelAlign="left"
              form={widgetForm}
              initialValues={widgetDataValue}
              onFinish={widgetOnFinish}
            >
              <DynamicForm
                formSubmit
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
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  保存
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        ) : null}
      </Tabs>
    </div>
  );
};
