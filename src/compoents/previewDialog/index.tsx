import React, { FC } from "react";
import { Modal, ModalProps } from "antd";
import "./index.scss";
interface IPreviewDialogProps extends ModalProps {}

const PreviewDialog: FC<IPreviewDialogProps> = ({
  children,
  open,
  onClose,
  title,
  width,
  height,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
      onCancel={onClose}
      centered
      width="auto"
      footer={null}
    >
      <div
        style={{
          width: width + "px",
          height: height + "px",
        }}
        className="cms-preview-dialog"
      >
        {children}
      </div>
    </Modal>
  );
};

export default PreviewDialog;
