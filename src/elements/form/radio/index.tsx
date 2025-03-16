import { Radio, RadioChangeEvent } from "antd";
import React, { FC, useMemo } from "react";
import "./index.scss";
interface IFormRadio {
  options: IAnyObject;
  data: any;
  field: string;
  other?: IAnyObject;
}

export const FormRadio: FC<IFormRadio> = ({ options, data, field, other }) => {
  const datas = useMemo(() => {
    return data && data[field]
      ? Array.isArray(data[field])
        ? data[field]
        : []
      : [];
  }, [data, field]);
  const onChange = (e: RadioChangeEvent) => {
    other?.onChangeHandler?.(e.target.value);
  };

  const defaultValue = useMemo(() => {
    return (
      other?.params?.[other?.paramName] || (datas.length ? datas[0].value : "")
    );
  }, [datas, other?.paramName, other?.params]);
  return (
    <div
      className="cms-form__radio"
      style={{ justifyContent: options.radioTextAlign }}
    >
      <Radio.Group
        value={defaultValue}
        size={options?.radioSize}
        onChange={onChange}
        optionType={options?.radioOptionType || "default"}
      >
        {datas.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};
