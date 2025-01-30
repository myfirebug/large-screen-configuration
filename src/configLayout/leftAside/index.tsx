import React, { FC, ReactNode, useEffect, useState } from "react";
import { PAGETYPENAME } from "@src/core/enums/access.enums";
import { Tooltip } from "antd";
import Box from "../box";
import "./index.scss";
interface IConfigLayoutLeftAside {
  navs: PageType[];
  render: (data: PageType | "") => ReactNode;
}

interface ITabItem {
  icon: string;
  type: PageType;
}

const ALLTABS: ITabItem[] = [
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
];

const ConfigLayoutLeftAside: FC<IConfigLayoutLeftAside> = ({
  render,
  navs,
}) => {
  const [current, setCurrent] = useState<PageType | "">("element");
  const [tabs, setTabs] = useState<ITabItem[]>([]);

  useEffect(() => {
    setTabs(() => {
      return ALLTABS.filter((item) => navs.includes(item.type));
    });
    !current && setCurrent(navs[0]);
  }, [navs, setTabs, setCurrent, current]);
  return (
    <div className="cms-config-layout__leftAside">
      <ul className="cms-config-layout__leftAside--tabs">
        {tabs.map((item) => (
          <li
            className={`cms-config-layout__leftAside--tabItem ${
              current === item.type ? "is-active" : ""
            }`}
            onClick={() => setCurrent(item.type)}
            key={item.type}
          >
            <Tooltip placement="left" title={PAGETYPENAME[item.type]}>
              <i
                className="cms-icon"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              ></i>
            </Tooltip>
          </li>
        ))}
      </ul>
      <div
        className="cms-config-layout__leftAside--tabContent"
        style={{
          borderRight: current ? "1px solid var(--cms-divider-color)" : "none",
        }}
      >
        <Box
          title={current ? PAGETYPENAME[current] : ""}
          onClose={() => setCurrent("")}
        >
          {render(current)}
        </Box>
      </div>
    </div>
  );
};

export default ConfigLayoutLeftAside;
