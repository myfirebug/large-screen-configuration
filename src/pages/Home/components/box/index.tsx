import React, { FC, HtmlHTMLAttributes, ReactNode } from "react";
import "./index.scss";
interface IBox extends HtmlHTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
}

const Box: FC<IBox> = ({ title, children, style, className }) => {
  return (
    <div className={`cms-box ${className}`} style={style}>
      <div className="cms-box__header">{title}</div>
      <div className="cms-box__body">{children}</div>
    </div>
  );
};

export default Box;
