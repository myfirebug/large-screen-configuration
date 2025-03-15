import React, { FC, useEffect, useState } from "react";
import Request from "@src/compoents/request";
import { Spin } from "antd";
import PreviewLayout from "@src/layout/previewLayout";
import GridLayout from "@src/layout/gridLayout";
import { IElement } from "@src/service";
import RenderElement from "../renderElement";
import {
  WIDGET_BODY_COLUMN,
  WIDGET_BODY_GAP,
  WIDGET_BODY_ROW,
  WIDGET_HEADER_COLUMN,
  WIDGET_HEADER_GAP,
  WIDGET_HEADER_ROW,
} from "@src/core/enums/access.enums";
import { Layout } from "react-grid-layout";

interface IRenderWidgetProps {
  data: IAnyObject;
  configureValue: IAnyObject;
  isDroppable?: boolean;
  isResizable?: boolean;
  staticed?: boolean;
  selectedId?: string;
  onDrop?: (item: Layout, data: any, position: "header" | "body") => void;
  onDragStop?: (item: Layout) => void;
  onResizeStop?: (item: Layout) => void;
  onClose?: (item: IAnyObject) => void;
}

const RenderWidget: FC<IRenderWidgetProps> = ({
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
}) => {
  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    const timmer = setTimeout(() => {
      setIsRender(true);
    }, 200);
    return () => {
      clearTimeout(timmer);
    };
  }, []);
  return (
    <>
      {isRender ? (
        <Request
          method={data?.configuration?.dataValue?.method}
          url={data?.configuration?.dataValue?.url}
          params={JSON.stringify(data?.configuration?.dataValue?.params || {})}
          render={(loading: boolean, success: boolean, realData: any) => {
            return (
              <>
                {loading ? (
                  <Spin
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "tranlate(-50%, -50%)",
                      zIndex: 1000,
                    }}
                  />
                ) : null}
                <PreviewLayout
                  data={data}
                  header={
                    <GridLayout
                      datas={
                        data?.elements.filter(
                          (item: IElement) => item.position === "header"
                        ) || []
                      }
                      selectedId={selectedId}
                      configureValue={configureValue}
                      column={WIDGET_HEADER_COLUMN}
                      row={WIDGET_HEADER_ROW}
                      gap={WIDGET_HEADER_GAP}
                      render={(data) => (
                        <RenderElement data={data} realData={realData} />
                      )}
                      isDroppable={isDroppable}
                      isResizable={isResizable}
                      staticed={staticed}
                      onDrop={(item, data) => onDrop?.(item, data, "header")}
                      onDragStop={onDragStop}
                      onResizeStop={onResizeStop}
                      onClose={onClose}
                    />
                  }
                  body={
                    <GridLayout
                      configureValue={configureValue}
                      datas={
                        data?.elements.filter(
                          (item: IElement) => item.position === "body"
                        ) || []
                      }
                      selectedId={selectedId}
                      column={WIDGET_BODY_COLUMN}
                      row={WIDGET_BODY_ROW}
                      gap={WIDGET_BODY_GAP}
                      render={(data) => (
                        <RenderElement data={data} realData={realData} />
                      )}
                      isDroppable={isDroppable}
                      isResizable={isResizable}
                      staticed={staticed}
                      onDrop={(item, data) => onDrop?.(item, data, "body")}
                      onDragStop={onDragStop}
                      onResizeStop={onResizeStop}
                      onClose={onClose}
                    />
                  }
                />
              </>
            );
          }}
        />
      ) : null}
    </>
  );
};

export default RenderWidget;
