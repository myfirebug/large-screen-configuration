import React, { FC } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Switch,
  ColorPicker,
  FormInstance,
} from "antd";
// JSON编辑器
import JsonEditor from "@src/compoents/jsonEditor";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

interface IBaseForm {
  item: IAnyObject;
  form: FormInstance<any>;
  callback: Function;
  formSubmit?: boolean;
}

const BaseForm: FC<IBaseForm> = ({ item, form, callback, formSubmit }) => {
  return (
    <>
      {item.componentName === "Input" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          rules={[{ required: item.required }]}
          validateTrigger="onBlur"
        >
          <Input
            size="small"
            allowClear
            disabled={item.disabled}
            placeholder={item.placeholder}
            onBlur={(e) => !formSubmit && callback(item.name, e.target.value)}
          />
        </Form.Item>
      )}
      {item.componentName === "InputNumber" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          validateTrigger="onBlur"
          rules={[{ required: item.required }]}
        >
          <InputNumber
            size="small"
            disabled={item.disabled}
            min={item.min}
            max={item.max}
            style={{ width: "100%" }}
            addonAfter={item.addonAfter || ""}
            placeholder={item.placeholder}
            onBlur={(e) => !formSubmit && callback(item.name, e.target.value)}
          />
        </Form.Item>
      )}
      {item.componentName === "TextArea" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          rules={[{ required: item.required }]}
          validateTrigger="onBlur"
        >
          <TextArea
            size="small"
            allowClear
            disabled={item.disabled}
            rows={8}
            placeholder={item.placeholder}
            onBlur={(e) => !formSubmit && callback(item.name, e.target.value)}
          />
        </Form.Item>
      )}
      {item.componentName === "Switch" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          valuePropName="checked"
          rules={[{ required: item.required }]}
        >
          <Switch
            size="small"
            disabled={item.disabled}
            onChange={(e) => !formSubmit && callback(item.name, e)}
          />
        </Form.Item>
      )}
      {item.componentName === "Slider" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          rules={[{ required: item.required }]}
        >
          <Slider
            min={item.min || 0}
            max={item.max || 100}
            disabled={item.disabled}
            step={item.step || 1}
            onChangeComplete={(e) => !formSubmit && callback(item.name, e)}
          />
        </Form.Item>
      )}
      {item.componentName === "Select" && (
        <Form.Item
          label={item.label}
          name={item.name}
          tooltip={item.tooltip}
          rules={[{ required: item.required }]}
        >
          <Select
            size="small"
            allowClear
            disabled={item.disabled}
            placeholder={item.placeholder}
            onChange={(e) => !formSubmit && callback(item.name, e)}
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
        <Form.Item
          label={item.label}
          name={item.name}
          rules={[{ required: item.required }]}
        >
          <ColorPicker
            size="small"
            //allowClear
            format="hex"
            showText
            disabled={item.disabled}
            onChangeComplete={(e) =>
              !formSubmit
                ? callback(item.name, `#${e.toHex()}`)
                : form.setFieldValue(item.name, `#${e.toHex()}`)
            }
          />
        </Form.Item>
      )}
      {item.componentName === "JsonEdit" && (
        <Form.Item
          name={item.name}
          tooltip={item.tooltip}
          rules={[{ required: item.required }]}
        >
          <Form.Item shouldUpdate noStyle>
            <div style={{ paddingBottom: 10 }}>{item.label}:</div>
            <JsonEditor
              value={form.getFieldValue(item.name)}
              onChange={(e) =>
                !formSubmit
                  ? callback(item.name, e)
                  : form.setFieldValue(item.name, e)
              }
            />
          </Form.Item>
        </Form.Item>
      )}
    </>
  );
};

export default BaseForm;
