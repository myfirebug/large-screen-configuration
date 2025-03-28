import React, { FC, useMemo } from "react";
import { Form, Select } from "antd";
import { IWidget } from "@src/service";

interface IConfigLayoutRightAsideLinkage {
  currentWidgetId: string;
  widgets: IWidget[];
  onFinish: (data: IAnyObject) => void;
}

export const ConfigLayoutRightAsideLinkage: FC<
  IConfigLayoutRightAsideLinkage
> = ({ currentWidgetId, onFinish, widgets }) => {
  const [form] = Form.useForm();

  const linkageIds = useMemo(() => {
    return (
      widgets
        .find((item) => item.widgetId === currentWidgetId)
        ?.configuration?.dataValue?.linkageIds?.split(",") || undefined
    );
  }, [currentWidgetId, widgets]);

  return (
    <div className="cms-config-layout__element" style={{ paddingTop: 10 }}>
      <Form
        labelCol={{ flex: "60px" }}
        labelAlign="left"
        form={form}
        initialValues={{
          linkageIds: linkageIds,
        }}
      >
        <Form.Item label="微件关联" name="linkageIds" validateTrigger="onBlur">
          <Select
            mode="multiple"
            placeholder="请选择联动组件"
            onChange={(e) => onFinish({ linkageIds: e ? e?.join(",") : "" })}
          >
            {widgets
              .filter((item) => item.widgetId !== currentWidgetId)
              .map((item) => (
                <Select.Option key={item.widgetId} value={item.widgetId}>
                  {item.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};
