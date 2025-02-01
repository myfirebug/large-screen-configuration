import React, { FC, ReactNode } from "react";
import "./index.scss";
import { CloseOutlined } from "@ant-design/icons";
interface IBox {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Box: FC<IBox> = ({ title, children, onClose }) => {
  return (
    <div className="cms-box" style={{ display: title ? "flex" : "none" }}>
      <div className="cms-box__header">
        <div className="name">{title}</div>
        <CloseOutlined onClick={onClose} />
      </div>
      <div className="cms-box__body">{children}</div>
    </div>
  );
};

export default Box;
