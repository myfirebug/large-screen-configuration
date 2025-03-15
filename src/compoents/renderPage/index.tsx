import GridLayout from "@src/layout/gridLayout";
import PreviewLayout from "@src/layout/previewLayout";
import React, { FC } from "react";
import RenderWidget from "../renderWidget";
import { Layout } from "react-grid-layout";
import { IWidget } from "@src/service";

interface IRenderPageProps {
  data: IAnyObject;
  configureValue: IAnyObject;
  isDroppable?: boolean;
  isResizable?: boolean;
  staticed?: boolean;
  selectedId?: string;
  widgets: IWidget[];
  onDrop?: (item: Layout, data: any, position: "header" | "body") => void;
  onDragStop?: (item: Layout) => void;
  onResizeStop?: (item: Layout) => void;
  onClose?: (item: IAnyObject) => void;
}

const RenderPage: FC<IRenderPageProps> = ({
  data,
  configureValue,
  isDroppable = true,
  isResizable = true,
  staticed = true,
  selectedId,
  onDrop,
  onDragStop,
  onResizeStop,
  onClose,
  widgets,
}) => {
  return (
    <PreviewLayout
      data={data}
      header={
        <GridLayout
          datas={widgets?.filter((item) => item.position === "header") || []}
          selectedId={selectedId}
          render={(data) => (
            <RenderWidget data={data} configureValue={configureValue} />
          )}
          configureValue={configureValue}
          row={1}
          column={configureValue?.horizontalNumber}
          onDrop={(item, data) => onDrop?.(item, data, "header")}
          isDroppable={isDroppable}
          isResizable={isResizable}
          staticed={staticed}
          onDragStop={onDragStop}
          onResizeStop={onResizeStop}
          onClose={onClose}
        />
      }
      body={
        <GridLayout
          datas={widgets?.filter((item) => item.position === "body") || []}
          selectedId={selectedId}
          render={(data) => (
            <RenderWidget data={data} configureValue={configureValue} />
          )}
          configureValue={configureValue}
          row={configureValue?.verticalNumber}
          column={configureValue?.horizontalNumber}
          onDrop={(item, data) => onDrop?.(item, data, "body")}
          isDroppable={isDroppable}
          isResizable={isResizable}
          staticed={staticed}
          onDragStop={onDragStop}
          onResizeStop={onResizeStop}
          onClose={onClose}
        />
      }
    />
  );
};

export default RenderPage;
