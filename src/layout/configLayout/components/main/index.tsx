import React, { FC, ReactNode } from "react";
import Rule from "./components/rule";
import "./index.scss";
interface IConfigLayoutMain {
  children: ReactNode;
}

export const ConfigLayoutMain: FC<IConfigLayoutMain> = ({ children }) => {
  return (
    <div className="cms-config-layout__main">
      <div className="cms-config-layout__center">
        <Rule />
        {children}
      </div>
    </div>
  );
};
