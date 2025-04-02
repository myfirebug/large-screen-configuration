import { Select } from "antd";
import React, { FC, useMemo } from "react";
import "./index.scss";
interface IFormRadio {
  options: IAnyObject;
  data: any;
  field: string;
  other?: IAnyObject;
}

export const FormSelect: FC<IFormRadio> = ({ options, data, field, other }) => {
  const datas = useMemo(() => {
    return data && data[field]
      ? Array.isArray(data[field])
        ? data[field]
        : []
      : [];
  }, [data, field]);
  const onChange = (e: any) => {
    other?.onChangeHandler?.(e);
  };

  const defaultValue = useMemo(() => {
    return (
      other?.params?.[other?.paramName] || (datas.length ? datas[0].value : "")
    );
  }, [datas, other?.paramName, other?.params]);
  return (
    <div
      className="cms-form__select"
      style={{ justifyContent: options.radioTextAlign }}
    >
      <Select
        value={defaultValue}
        size={options?.radioSize}
        onChange={onChange}
      >
        {datas.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
