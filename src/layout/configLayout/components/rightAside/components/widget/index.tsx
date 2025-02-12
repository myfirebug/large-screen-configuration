import React, { FC, useCallback, useEffect } from "react";
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

  const onValuesChange = useCallback(
    (changedValues: any, allValues: IAnyObject) => {
      // 所有变化的值
      let fields = { ...allValues };
      for (let filed in fields) {
        if (typeof fields[filed] === "object") {
          fields[filed] = `#${fields[filed].toHex()}`;
        }
      }
      onFinish(fields);
    },
    [onFinish]
  );
  return (
    <div className="cms-config-layout__widget">
      <Form
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        form={form}
        onValuesChange={onValuesChange}
      >
        <DynamicForm datas={widgetConfig.configure || []} />
      </Form>
    </div>
  );
};
