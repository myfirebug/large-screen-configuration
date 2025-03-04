import { dragStore } from "@src/compoents/dragdrop/drag";
import React, { memo, ReactNode, useMemo } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "./index.scss";
import { getStyles } from "@src/utils";
import AuxiliaryLine from "./components/auxiliaryLine";
interface IGridLayout {
  configureValue?: IAnyObject;
  groupName?: string;
  width?: number;
  height?: number;
  row?: number;
  column?: number;
  datas?: IAnyObject[];
  gap?: number;
  isDroppable?: boolean;
  isResizable?: boolean;
  render?: (data: IAnyObject) => ReactNode;
  onDrop?: (item: Layout, data: any) => void;
  onDragStop?: (item: Layout) => void;
}

const GridLayout = memo((props: IGridLayout) => {
  const {
    configureValue = {},
    groupName = "elements",
    width = 1080,
    height = 800,
    row = 3,
    column = 4,
    datas,
    gap = 10,
    isDroppable = true,
    isResizable = true,
    render,
    onDrop,
    onDragStop,
  } = props;
  const layout = useMemo(() => {
    let arr: Layout[] = [];
    arr =
      datas?.map((item: IAnyObject) => {
        return {
          i: item.widgetId || item.elementId,
          w: item.row,
          h: item.column,
          x: item.x,
          y: item.y,
        };
      }) || [];
    return arr;
  }, [datas]);
  return (
    <div
      className="cms-grid-layout__main"
      style={getStyles(configureValue as IAnyObject, "page")}
    >
      {isDroppable && isResizable ? (
        <AuxiliaryLine
          gap={gap}
          column={column}
          width={width}
          height={height}
          row={row}
        />
      ) : null}

      <ReactGridLayout
        className="cms-grid-layout"
        layout={layout}
        isDroppable={isDroppable}
        isResizable={isResizable}
        rowHeight={(height - gap * (row + 1)) / row}
        maxRows={row}
        width={width}
        cols={column}
        verticalCompact={false}
        preventCollision
        margin={[gap, gap]}
        onDrop={(data, item, e) => {
          const dragData = dragStore.get(groupName as string);
          console.log("onDrop");
          if (item.x <= row && item.y <= column) {
            onDrop?.(item, dragData);
          }
        }}
        onResizeStop={(data, item, e) => {
          console.log(data, item, e, "resize");
        }}
        onDragStop={(data, oldItem, newItem) => {
          console.log("onDragStop");
          if (oldItem.x !== newItem.x || oldItem.y !== newItem.y) {
            onDragStop?.(newItem);
          }
        }}
      >
        {datas?.map((item, index) => (
          <div
            key={item.widgetId || item.elementId || index}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {render?.(item)}
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
});

export default GridLayout;
