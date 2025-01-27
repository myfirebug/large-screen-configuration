import React, { FC } from "react";

interface IBaseText {
  data: any;
  field: string;
  option: any;
}
// 基础文本框
export const BaseText: FC<IBaseText> = ({ data, field }) => {
  return <div>{data && data[field] ? data[field] : "文本框"}</div>;
};
