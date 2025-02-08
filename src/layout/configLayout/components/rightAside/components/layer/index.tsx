import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import { IWidget } from "@src/service";
import React, { FC } from "react";
import "./index.scss";

interface IConfigLayoutRightAsideLayer {
  datas: IWidget[];
  widgetId?: string;
  elementId?: string;
  onSelected: (widgetId: string, elementId?: string) => void;
}

export const ConfigLayoutRightAsideLayer: FC<IConfigLayoutRightAsideLayer> = ({
  datas,
  widgetId,
  elementId,
  onSelected,
}) => {
  return (
    <div className="cms-config-layout__layer">
      {datas.map((widget, index) => (
        <div
          key={widget.widgetId || index}
          className="cms-config-layout__layer--item"
        >
          <div
            className={`name ${
              widgetId === widget.widgetId ? "is-active" : ""
            }`}
            onClick={() => onSelected(widget.widgetId)}
          >
            <FolderOpenOutlined /> {widget.name}
          </div>
          <div className="content">
            {widget.elements.map((element) => (
              <div
                key={element.elementId}
                className={`${
                  elementId === element.elementId ? "is-active" : ""
                }`}
                onClick={() => onSelected(widget.widgetId, element.elementId)}
              >
                <FolderOutlined /> {element.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
