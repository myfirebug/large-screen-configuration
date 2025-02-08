import { getStyles } from "@src/utils";
import React, { FC } from "react";

interface IBaseText {
  data: any;
  field: string;
  options: any;
}
// 基础文本框
export const BaseText: FC<IBaseText> = ({ data, field, options }) => {
  return (
    <div style={getStyles(options)}>
      {data && data[field] ? data[field] : "文本框"}
    </div>
  );
};
