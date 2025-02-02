import React, { FC, ReactNode } from "react";
import { dragStore } from "../drag";
import "./index.scss";

interface IDragItem {
  data: IAnyObject;
  title: string;
  children: ReactNode;
  /** 拖拽分组标识 */
  groupName?: string;
}

const DragItem: FC<IDragItem> = ({
  title,
  children,
  data,
  groupName = "DrapDrop",
}) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragStore.set(groupName, data);
  };
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    dragStore.remove(groupName);
  };
  return (
    <div
      className="cms-drag__item"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="cms-drag__item--body">{children}</div>
      <div className="cms-drag__item--footer">{title}</div>
    </div>
  );
};

export default DragItem;
