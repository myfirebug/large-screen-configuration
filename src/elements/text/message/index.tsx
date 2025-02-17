import { getStyles } from "@src/utils";
import React, { FC, useMemo } from "react";
import Marquee from "react-fast-marquee";
import "./index.scss";

interface IMessageText {
  data: any;
  field: string;
  options: any;
}

export const MessageText: FC<IMessageText> = ({ data, field, options }) => {
  const baseTextStyle = useMemo(() => {
    return getStyles(options);
  }, [options]);
  const iconStyle = useMemo(() => {
    return getStyles(options, "iconStyle");
  }, [options]);
  return (
    <div className="cms-message-text" style={baseTextStyle}>
      <span className="cms-icon" style={iconStyle}>
        &#xe787;
      </span>
      <Marquee pauseOnHover gradient={false}>
        {data && data[field]
          ? data[field]
          : "I can be a React component, multiple React components, or just some text."}
      </Marquee>
    </div>
  );
};
