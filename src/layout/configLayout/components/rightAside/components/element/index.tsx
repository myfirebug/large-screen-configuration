import React, { FC } from "react";
import { Form } from "antd";
import DynamicForm from "../dynamicForm";
import elements from "@src/core/config/classification";

interface IConfigLayoutRightAsideElement {
  element?: elementsNameType;
  configureValue: IAnyObject;
  onFinish: (data: IAnyObject) => void;
}

export const ConfigLayoutRightAsideElement: FC<
  IConfigLayoutRightAsideElement
> = ({ configureValue, onFinish, element }) => {
  const [form] = Form.useForm();
  return (
    <div className="cms-config-layout__element">
      <Form
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        form={form}
        initialValues={configureValue}
      >
        <DynamicForm
          datas={elements?.[element as elementsNameType]?.configure || []}
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
