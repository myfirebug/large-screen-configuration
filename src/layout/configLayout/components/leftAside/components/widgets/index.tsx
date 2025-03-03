import React, { FC, useEffect, useState } from "react";
import { ELEMETSTYPE } from "@src/core/enums/access.enums";
import { widgets } from "@src/core/hook";
import { Empty, Image } from "antd";
import DragItem from "@src/compoents/dragdrop/dragItem";
import "./index.scss";
interface IConfigLayoutLeftAsideWidget {}

const ALLELEMENTS: elementsType[] = [
  "text",
  "image",
  "table",
  "line",
  "bar",
  "pie",
];

export const ConfigLayoutLeftAsideWidget: FC<
  IConfigLayoutLeftAsideWidget
> = () => {
  const [current, setCurrent] = useState<elementsType>("text");
  const { getWidgets, widgetsLoading, widgetsList } = widgets();
  useEffect(() => {
    getWidgets();
  }, [getWidgets]);
  return (
    <div className="cms-config-layout__widgets">
      <ul className="cms-config-layout__widgets--left">
        {ALLELEMENTS.map((item) => (
          <div
            key={item}
            className={current === item ? "is-active" : ""}
            onClick={() => setCurrent(item)}
          >
            {ELEMETSTYPE[item]}
          </div>
        ))}
      </ul>
      <div className="cms-config-layout__widgets--right">
        {widgetsList
          .filter((item) => item.type === current)
          ?.map((item) => (
            <DragItem
              key={item.widgetId}
              title={item.name}
              data={item}
              groupName="elements"
            >
              <Image width={174} src={item.url} preview={false} />
            </DragItem>
          ))}
        {!widgetsLoading &&
          !widgetsList.filter((item) => item.type === current)?.length && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
      </div>
    </div>
  );
};
