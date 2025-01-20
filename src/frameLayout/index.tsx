import React, { FC, HtmlHTMLAttributes, ReactNode } from "react";
import Header from "./components/header";
import Aside from "./components/aside";
import "./index.scss";

interface IFrameLayout extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FrameLayout: FC<IFrameLayout> = ({ children, style, className }) => {
  return (
    <div className={`cms-frame-layout ${className || ""}`}>
      <Header />
      <div className="cms-frame-layout__content">
        <Aside />
        <div className="cms-frame-layout__main">{children}</div>
      </div>
    </div>
  );
};

export default FrameLayout;
