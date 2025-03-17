import React, { FC } from "react";
import { getStyles } from "@src/utils";
import "./index.scss";
import { IPage } from "@src/service";
interface INavigationProps {
  datas: IPage[];
  selectedId: string;
  onChange: (pageId: string) => void;
  configureValue: IAnyObject;
}

const Navigation: FC<INavigationProps> = ({
  datas,
  selectedId,
  onChange,
  configureValue,
}) => {
  return (
    <div
      className="cms-config-layout__navigation"
      style={getStyles(configureValue || {}, "navigationStyle")}
    >
      {datas.map((item) => (
        <div
          key={item.pageId}
          onClick={() => onChange(item.pageId)}
          className={item.pageId === selectedId ? "is-active" : ""}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Navigation;
