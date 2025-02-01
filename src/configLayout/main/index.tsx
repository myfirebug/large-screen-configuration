import React, { FC, ReactNode } from "react";
import Rule from "../rule";
import "./index.scss";
interface IConfigLayoutMain {
  children: ReactNode;
}

const ConfigLayoutMain: FC<IConfigLayoutMain> = ({ children }) => {
  return (
    <div className="cms-config-layout__main">
      <div className="cms-config-layout__center">
        <Rule />
        {children}
      </div>
    </div>
  );
};

export default ConfigLayoutMain;
