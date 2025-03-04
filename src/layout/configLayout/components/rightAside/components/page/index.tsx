import React, { FC } from "react";
import { Form } from "antd";
import DynamicForm from "../dynamicForm";
import { pageConfig } from "@src/core/config/base";

interface IConfigLayoutRightAsidePage {
  configureValue: IAnyObject;
  onFinish: (data: IAnyObject) => void;
}

export const ConfigLayoutRightAsidePage: FC<IConfigLayoutRightAsidePage> = ({
  configureValue,
  onFinish,
}) => {
  const [form] = Form.useForm();
  return (
    <div className="cms-config-layout__element">
      <Form
        labelCol={{ flex: "80px" }}
        labelAlign="left"
        form={form}
        initialValues={configureValue}
      >
        <DynamicForm
          datas={pageConfig.configure || []}
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
