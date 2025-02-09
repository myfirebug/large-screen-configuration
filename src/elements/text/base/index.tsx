import { getStyles } from "@src/utils";
import React, { FC, useMemo } from "react";

interface IBaseText {
  data: any;
  field: string;
  options: any;
}
// 基础文本框
export const BaseText: FC<IBaseText> = ({ data, field, options }) => {
  const style = useMemo(() => {
    return getStyles(options);
  }, [options]);
  return (
    <div style={style}>{data && data[field] ? data[field] : "文本框"}</div>
  );
};
