import React, { FC, ReactNode, useEffect, useState } from "react";
import { PAGETYPENAME } from "@src/core/enums/access.enums";
import { Tooltip } from "antd";
import Box from "../box";
import "./index.scss";
interface IConfigLayoutRightAside {
  render: (data: PageType | "") => ReactNode;
  navs: PageType[];
}

interface ITabItem {
  icon: string;
  type: PageType;
}

const ALLTABS: ITabItem[] = [
  {
    icon: "&#xe63c;",
    type: "layer",
  },
  {
    icon: "&#xe652;",
    type: "element",
  },
  {
    icon: "&#xe634;",
    type: "widget",
  },
  {
    icon: "&#xe652;",
    type: "page",
  },
  {
    icon: "&#xe652;",
    type: "linkage",
  },
];

export const ConfigLayoutRightAside: FC<IConfigLayoutRightAside> = ({
  render,
  navs,
}) => {
  const [current, setCurrent] = useState<PageType | "">("element");
  const [tabs, setTabs] = useState<ITabItem[]>([]);

  useEffect(() => {
    setTabs(() => {
      return ALLTABS.filter((item) => navs.includes(item.type));
    });
    setCurrent(navs[0]);
  }, [navs, setTabs, setCurrent]);
  return (
    <div className="cms-config-layout__rightAside">
      <div
        className="cms-config-layout__rightAside--tabContent"
        style={{
          borderLeft: current ? "1px solid var(--cms-divider-color)" : "none",
        }}
      >
        <Box
          title={`${current ? PAGETYPENAME[current] + "配置" : ""}`}
          onClose={() => setCurrent("")}
        >
          {render(current)}
        </Box>
      </div>
      <ul className="cms-config-layout__rightAside--tabs">
        {tabs.map((item) => (
          <li
            className={`cms-config-layout__rightAside--tabItem ${
              current === item.type ? "is-active" : ""
            }`}
            onClick={() => setCurrent(item.type)}
            key={item.type}
          >
            <Tooltip placement="left" title={`${PAGETYPENAME[item.type]}配置`}>
              <i
                className="cms-icon"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              ></i>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};
