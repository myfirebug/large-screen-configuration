import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import "./index.scss";
import { Empty } from "antd";

interface IConfigLayoutRightAsideLayer {
  datas: IAnyObject[];
  pageId?: string;
  widgetId?: string;
  elementId?: string;
  projectId?: string;
  pid?: string;
  onSelected: (
    type: "page" | "widget" | "element" | "project",
    id: string,
    pid?: string
  ) => void;
}

const renderTree = (props: IConfigLayoutRightAsideLayer) => {
  const { datas, pageId, widgetId, elementId, onSelected, pid, projectId } =
    props;
  return datas.map((item, index) => {
    return (
      <div className="cms-config-layout__layer--item" key={index}>
        <div
          onClick={() =>
            onSelected?.(
              item.projectId
                ? "project"
                : item.pageId
                ? "page"
                : item.widgetId
                ? "widget"
                : "element",
              item.projectId || item.pageId || item.widgetId || item.elementId,
              pid
            )
          }
          className={`name ${
            (item.projectId === projectId && projectId) ||
            (item.pageId === pageId && pageId) ||
            (item.widgetId === widgetId && widgetId) ||
            (item.elementId === elementId && elementId)
              ? "is-active"
              : ""
          }`}
        >
          {item?.pages?.length ||
          item?.widgets?.length ||
          item?.elements?.length ? (
            <FolderOpenOutlined />
          ) : (
            <FolderOutlined />
          )}{" "}
          {item.name}
        </div>
        {item?.pages?.length ||
        item?.widgets?.length ||
        item?.elements?.length ? (
          <>
            {renderTree({
              datas: item?.pages || item.widgets || item.elements,
              pageId,
              widgetId,
              elementId,
              onSelected,
              pid: item.pageId || item.widgetId || item.elementId,
              projectId,
            })}
          </>
        ) : null}
      </div>
    );
  });
};

export const ConfigLayoutRightAsideLayer: FC<IConfigLayoutRightAsideLayer> = ({
  datas,
  widgetId,
  elementId,
  pageId,
  onSelected,
  projectId,
}) => {
  return (
    <div className="cms-config-layout__layer">
      {datas.length ? (
        renderTree({
          datas,
          pageId,
          widgetId,
          elementId,
          onSelected,
          projectId,
        })
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};
