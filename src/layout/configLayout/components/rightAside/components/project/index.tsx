import React, { FC } from "react";
import { Form } from "antd";
import DynamicForm from "../dynamicForm";
import { projectConfig } from "@src/core/config/base";

interface IConfigLayoutRightAsideProject {
  configureValue: IAnyObject;
  onFinish: (data: IAnyObject) => void;
}

export const ConfigLayoutRightAsideProject: FC<
  IConfigLayoutRightAsideProject
> = ({ configureValue, onFinish }) => {
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
          datas={projectConfig.configure || []}
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
