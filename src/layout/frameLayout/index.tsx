import React, { FC, HtmlHTMLAttributes, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { getGroupById } from "@src/utils";
import routerDatas, { IRoute } from "@src/router/routes";
import Header from "./components/header";
import Aside from "./components/aside";
import "./index.scss";

interface IFrameLayout extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FrameLayout: FC<IFrameLayout> = ({ children, style, className }) => {
  const a = useLocation();
  const currentRoute: IRoute = getGroupById(routerDatas, a.pathname, "path");
  return (
    <div className={`cms-frame-layout ${className || ""}`}>
      {!currentRoute?.meta?.fullScreen ? <Header /> : null}

      <div className="cms-frame-layout__content">
        {!currentRoute?.meta?.fullScreen ? <Aside /> : null}

        <div className="cms-frame-layout__main">{children}</div>
      </div>
    </div>
  );
};

export default FrameLayout;
