import React, { FC, useEffect, useState } from "react";
import { ELEMETSTYPE } from "@src/core/enums/access.enums";
import { elements } from "@src/core/hook";
import { Empty, Image } from "antd";
import DragItem from "@src/compoents/dragdrop/dragItem";
import "./index.scss";
interface IConfigLayoutLeftAsideElements {}

const ALLELEMENTS: elementsType[] = [
  "text",
  "image",
  "table",
  "line",
  "bar",
  "pie",
];

export const ConfigLayoutLeftAsideElements: FC<
  IConfigLayoutLeftAsideElements
> = () => {
  const [current, setCurrent] = useState<elementsType>("text");
  const { getElements, elementsList, elementsLoading } = elements();
  useEffect(() => {
    getElements();
  }, [getElements]);
  return (
    <div className="cms-config-layout__elements">
      <ul className="cms-config-layout__elements--left">
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
      <div className="cms-config-layout__elements--right">
        {elementsList
          .filter((item) => item.type === current)
          ?.map((item) => (
            <DragItem
              key={item.code}
              title={item.name}
              data={item}
              groupName="elements"
            >
              <Image width={224} height={120} src={item.url} preview={false} />
            </DragItem>
          ))}
        {!elementsLoading &&
          !elementsList.filter((item) => item.type === current)?.length && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
      </div>
    </div>
  );
};
