import React, { FC } from "react";
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

interface IRenderWidgetProps {
  data: IAnyObject;
  configureValue: IAnyObject;
}

const RenderWidget: FC<IRenderWidgetProps> = ({ data, configureValue }) => {
  return (
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
                  configureValue={configureValue}
                  column={WIDGET_HEADER_COLUMN}
                  row={WIDGET_HEADER_ROW}
                  gap={WIDGET_HEADER_GAP}
                  render={(data) => (
                    <RenderElement data={data} realData={realData} />
                  )}
                  isDroppable
                  isResizable
                  staticed
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
                  column={WIDGET_BODY_COLUMN}
                  row={WIDGET_BODY_ROW}
                  gap={WIDGET_BODY_GAP}
                  render={(data) => (
                    <RenderElement data={data} realData={realData} />
                  )}
                  isDroppable
                  isResizable
                  staticed
                />
              }
            />
          </>
        );
      }}
    />
  );
};

export default RenderWidget;
