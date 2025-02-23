import React, { FC, useEffect } from "react";
import { Form } from "antd";
import DynamicForm from "../dynamicForm";
import { widgetConfig } from "@src/core/config/base";

interface IConfigLayoutRightAsideWidget {
  configureValue: IAnyObject;
  onFinish: (data: IAnyObject) => void;
}

export const ConfigLayoutRightAsideWidget: FC<
  IConfigLayoutRightAsideWidget
> = ({ configureValue, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(configureValue);
  }, [configureValue, form]);

  return (
    <div className="cms-config-layout__widget">
      <Form labelCol={{ flex: "110px" }} labelAlign="left" form={form}>
        <DynamicForm
          datas={widgetConfig.configure || []}
          form={form}
          callback={(field: string, value: any) => {
            const val =
              value && !isNaN(value) && typeof value !== "boolean"
                ? Number(value)
                : value;
            if (configureValue[field] !== val) {
              onFinish({
                [field]: val,
              });
            }
          }}
        />
      </Form>
    </div>
  );
};
