import React, { FC, useMemo } from "react";
import { Image } from "antd";
import { getStyles } from "@src/utils";
import "./index.scss";
interface IBaseImage {
  data: any;
  field: string;
  options: any;
}
export const BaseImage: FC<IBaseImage> = ({ data, field, options }) => {
  const baseTextStyle = useMemo(() => {
    return getStyles(options);
  }, [options]);
  return (
    <div className="cms-base-image" style={baseTextStyle}>
      <Image
        width="100%"
        height="100%"
        src={
          data && data[field]
            ? data[field]
            : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      />
    </div>
  );
};

export default BaseImage;
