import React, { FC, ReactNode } from "react";
import "./index.scss";
interface IWidgetLayout {
  header: ReactNode;
  body: ReactNode;
}

const WidgetLayout: FC<IWidgetLayout> = ({ header, body }) => {
  return (
    <div className="cms-widget">
      <div className="cms-widget__header">{header}</div>
      <div className="cms-widget__body">{body}</div>
    </div>
  );
};

export default WidgetLayout;
