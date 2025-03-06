import React, { FC } from "react";
import "./index.scss";
interface IConfigLayoutMask {}

export const ConfigLayoutMask: FC<IConfigLayoutMask> = () => {
  return <div className="cms-config-layout__mask"></div>;
};
