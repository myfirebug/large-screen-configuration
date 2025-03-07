import React, { FC, useCallback } from "react";
import { Modal, ModalProps } from "antd";
import { IElement, IWidget } from "@src/service";
import PreviewLayout from "@src/layout/previewLayout";
import { capitalizeFirstLetter } from "@src/utils";
import {
  WIDGET_BODY_COLUMN,
  WIDGET_BODY_GAP,
  WIDGET_BODY_ROW,
  WIDGET_HEADER_COLUMN,
  WIDGET_HEADER_GAP,
  WIDGET_HEADER_ROW,
} from "@src/core/enums/access.enums";
import elements from "@src/elements";
import GridLayout from "@src/layout/gridLayout";

interface IWidgetPreviewDialog extends ModalProps {
  onClose: () => void;
  data: IWidget;
}

const WidgetPreviewDialog: FC<IWidgetPreviewDialog> = ({
  open,
  onClose,
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
      width={
        data?.configuration?.configureValue?.widgetConfigWidth
          ? data?.configuration?.configureValue?.widgetConfigWidth + 30
          : 630
      }
    >
      <PreviewLayout
        data={data}
        style={{
          width: `${
            data?.configuration?.configureValue?.widgetConfigWidth || 600
          }px`,
          height: `${
            data?.configuration?.configureValue?.widgetConfigHeight || 400
          }px`,
        }}
        header={
          <GridLayout
            datas={
              data?.elements.filter(
                (item: IElement) => item.position === "header"
              ) || []
            }
            isDroppable={false}
            isResizable={false}
            column={WIDGET_HEADER_COLUMN}
            row={WIDGET_HEADER_ROW}
            gap={WIDGET_HEADER_GAP}
            render={renderPreview}
            staticed
          />
        }
        body={
          <GridLayout
            datas={
              data?.elements.filter(
                (item: IElement) => item.position === "body"
              ) || []
            }
            isDroppable={false}
            isResizable={false}
            column={WIDGET_BODY_COLUMN}
            row={WIDGET_BODY_ROW}
            gap={WIDGET_BODY_GAP}
            render={renderPreview}
            staticed
          />
        }
      />
    </Modal>
  );
};

export default WidgetPreviewDialog;
