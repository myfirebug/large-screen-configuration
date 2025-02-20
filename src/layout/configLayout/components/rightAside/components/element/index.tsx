import React, { FC, useCallback, useEffect } from "react";
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

  useEffect(() => {
    form.setFieldsValue(configureValue);
  }, [configureValue, form]);
  return (
    <div className="cms-config-layout__element">
      <Form
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        form={form}
        onValuesChange={onValuesChange}
      >
        <DynamicForm
          datas={elements?.[element as elementsNameType]?.configure || []}
        />
      </Form>
    </div>
  );
};
