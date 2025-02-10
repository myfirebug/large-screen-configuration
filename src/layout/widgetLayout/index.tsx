import React, { FC, HtmlHTMLAttributes, ReactNode } from "react";
import "./index.scss";
interface IWidgetLayout extends HtmlHTMLAttributes<HTMLDivElement> {
  header: ReactNode;
  body: ReactNode;
  headerStyles: IAnyObject;
  bodyStyles: IAnyObject;
}

const WidgetLayout: FC<IWidgetLayout> = ({
  header,
  body,
  style,
  headerStyles,
  bodyStyles,
}) => {
  return (
    <div className="cms-widget" style={style}>
      <div className="cms-widget__header" style={headerStyles}>
        {header}
      </div>
      <div className="cms-widget__body" style={bodyStyles}>
        {body}
      </div>
    </div>
  );
};

export default WidgetLayout;
