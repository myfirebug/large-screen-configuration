import React, { FC } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Switch,
  ColorPicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

interface IBaseForm {
  item: any;
}

const BaseForm: FC<IBaseForm> = ({ item }) => {
  return (
    <>
      {item.componentName === "Input" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          rules={[{ required: item.require }]}
          validateTrigger="onBlur"
        >
          <Input
            size="small"
            allowClear
            disabled={item.disabled}
            placeholder={item.placeholder}
          />
        </Form.Item>
      )}
      {item.componentName === "InputNumber" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          validateTrigger="onBlur"
          rules={[{ required: item.require }]}
        >
          <InputNumber
            size="small"
            disabled={item.disabled}
            min={item.min}
            max={item.max}
            style={{ width: "100%" }}
            addonAfter={item.addonAfter || ""}
            placeholder={item.placeholder}
          />
        </Form.Item>
      )}
      {item.componentName === "TextArea" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          rules={[{ required: item.require }]}
          validateTrigger="onBlur"
        >
          <TextArea
            size="small"
            allowClear
            disabled={item.disabled}
            rows={8}
            placeholder={item.placeholder}
          />
        </Form.Item>
      )}
      {item.componentName === "Switch" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          valuePropName="checked"
          rules={[{ required: item.require }]}
        >
          <Switch size="small" />
        </Form.Item>
      )}
      {item.componentName === "Slider" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          rules={[{ required: item.require }]}
        >
          <Slider
            min={item.min || 0}
            max={item.max || 100}
            disabled={item.disabled}
            step={item.step || 1}
          />
        </Form.Item>
      )}
      {item.componentName === "Select" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          rules={[{ required: item.require }]}
        >
          <Select
            size="small"
            allowClear
            disabled={item.disabled}
            placeholder={item.placeholder}
          >
            {item.options.map((subItem: any) => (
              <Option key={subItem.code} value={subItem.code}>
                <div
                  className={`${
                    item.name === "iconStyleSelect" ? "cms-icon" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: subItem.name }}
                ></div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {item.componentName === "SketchPicker" && (
        <Form.Item label={item.label} name={item.name}>
          <ColorPicker size="small" allowClear format="hex" showText />
        </Form.Item>
      )}
    </>
  );
};

export default BaseForm;
