import { getStyles } from "@src/utils";
import React, { FC, useMemo } from "react";
import "./index.scss";

interface IBaseText {
  data: any;
  field: string;
  options: any;
}
// 基础文本框
export const BaseText: FC<IBaseText> = ({ data, field, options }) => {
  const baseTextStyle = useMemo(() => {
    return getStyles(options);
  }, [options]);
  const iconStyle = useMemo(() => {
    return getStyles(options, "iconStyle");
  }, [options]);
  return (
    <div className="cms-base-text" style={baseTextStyle}>
      {options.iconStyleSelect ? (
        <span
          className="cms-icon"
          style={iconStyle}
          dangerouslySetInnerHTML={{ __html: options.iconStyleSelect }}
        ></span>
      ) : null}

      {data && data[field] ? data[field] : "文本框"}
    </div>
  );
};
