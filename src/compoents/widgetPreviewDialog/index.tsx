import React, { FC, useCallback } from "react";
import { Modal, ModalProps } from "antd";
import { IWidget } from "@src/service";
import WidgetLayout from "@src/layout/widgetLayout";
import { getStyles, capitalizeFirstLetter } from "@src/utils";
import PreviewLayout from "@src/compoents/dragdrop/previewLayout";
import {
  WIDGET_BODY_COLUMN,
  WIDGET_BODY_GAP,
  WIDGET_BODY_ROW,
  WIDGET_HEADER_COLUMN,
  WIDGET_HEADER_GAP,
  WIDGET_HEADER_ROW,
} from "@src/core/enums/access.enums";
import elements from "@src/elements";

interface IWidgetPreviewDialog extends ModalProps {
  onClose: () => void;
  data: IWidget;
}

const WidgetPreviewDialog: FC<IWidgetPreviewDialog> = ({
  open,
  onClose,
  height,
  data,
}) => {
  const renderPreview = useCallback((data: IAnyObject) => {
    if (data.element && elements[capitalizeFirstLetter(data.element)]) {
      return React.createElement(
        elements[capitalizeFirstLetter(data.element)],
        {
          options: data.configuration.configureValue,
          data: data.configuration?.dataValue?.mock,
          field: data.configuration?.dataValue?.field,
        }
      );
    }
    return <div>你访问的组件不存在请联系售后人员</div>;
  }, []);
  return (
    <Modal
      open={open}
      onClose={onClose}
      onCancel={onClose}
      footer={null}
      title={`微件预览`}
      destroyOnClose
      width={600}
    >
      <WidgetLayout
        style={{
          ...getStyles(data?.configuration?.configureValue || {}),
          height: "400px",
        }}
        headerStyles={{
          ...getStyles(
            data?.configuration?.configureValue || {},
            "headerStyle"
          ),
          display: data?.configuration?.configureValue?.headerShow
            ? "block"
            : "none",
        }}
        bodyStyles={getStyles(
          data?.configuration?.configureValue || {},
          "bodyStyle"
        )}
        header={
          <PreviewLayout
            datas={
              data?.elements.filter((item) => item.position === "header") || []
            }
            column={WIDGET_HEADER_COLUMN}
            row={WIDGET_HEADER_ROW}
            gap={WIDGET_HEADER_GAP}
            render={renderPreview}
          ></PreviewLayout>
        }
        body={
          <PreviewLayout
            datas={
              data?.elements.filter((item) => item.position === "body") || []
            }
            column={WIDGET_BODY_COLUMN}
            row={WIDGET_BODY_ROW}
            gap={WIDGET_BODY_GAP}
            render={renderPreview}
          ></PreviewLayout>
        }
      ></WidgetLayout>
    </Modal>
  );
};

export default WidgetPreviewDialog;
