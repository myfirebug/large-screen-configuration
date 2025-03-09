import { dragStore } from "@src/compoents/dragdrop/drag";
import React, { memo, ReactNode, useMemo } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "./index.scss";
import AuxiliaryLine from "./components/auxiliaryLine";
import BoundingClientRect from "@src/compoents/boundingClientRect";
interface IGridLayout {
  configureValue?: IAnyObject;
  groupName?: string;
  row?: number;
  column?: number;
  datas?: IAnyObject[];
  gap?: number;
  isDroppable?: boolean;
  isResizable?: boolean;
  staticed?: boolean;
  render?: (data: IAnyObject, realDdata?: IAnyObject) => ReactNode;
  onDrop?: (item: Layout, data: any) => void;
  onDragStop?: (item: Layout) => void;
  onResizeStop?: (item: Layout) => void;
  onClose?: (item: IAnyObject) => void;
}

const GridLayout = memo((props: IGridLayout) => {
  const {
    configureValue,
    groupName = "elements",
    row = 3,
    column = 4,
    datas,
    gap = 10,
    isDroppable = true,
    isResizable = true,
    staticed = false,
    render,
    onDrop,
    onDragStop,
    onResizeStop,
    onClose,
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
          static: staticed,
        };
      }) || [];
    return arr;
  }, [datas, staticed]);
  console.log("update");
  return (
    <BoundingClientRect
      render={(width, height) => {
        return (
          <div className="cms-grid-layout__main">
            {!staticed ? (
              <AuxiliaryLine
                gap={gap}
                column={column}
                width={width}
                height={height}
                row={row}
                borderColor={configureValue?.auxiliaryLineBorderColor}
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
              // verticalCompact={false}
              compactType={null}
              preventCollision
              margin={[gap, gap]}
              onDrop={(data, item, e) => {
                const dragData = dragStore.get(groupName as string);
                console.log("onDrop");
                if (item.x <= column && item.y <= row) {
                  onDrop?.(item, dragData);
                }
              }}
              onResizeStop={(data, oldItem, newItem) => {
                console.log("resize");
                if (oldItem.w !== newItem.w || oldItem.h !== newItem.h) {
                  onResizeStop?.(newItem);
                }
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
                  key={item.widgetId || item.elementId}
                  className="cms-grid-layout__item"
                >
                  {!staticed ? (
                    <div
                      className="cms-grid-layout__close"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onClose?.(item);
                      }}
                    ></div>
                  ) : null}
                  <div className="cms-grid-layout__item--content">
                    {render?.(item)}
                  </div>
                </div>
              ))}
            </ReactGridLayout>
          </div>
        );
      }}
    ></BoundingClientRect>
  );
});

export default GridLayout;
