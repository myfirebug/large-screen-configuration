import {
  EllipsisOutlined,
  FolderOpenOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import React, { FC, useCallback, useState } from "react";
import "./index.scss";
import { Empty, Popover } from "antd";
import ModifyNameDialog from "@src/compoents/modifyNameDialog";

interface ISelect {
  pageType: PageType | "";
  name: string;
  id: string;
  pId: string;
  show: boolean;
}
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
  pageType?: PageType;
  onEditHandler?: (
    type: "page" | "widget" | "element" | "project",
    id: string,
    name: string,
    pid?: string
  ) => void;
  onDeleteHandler?: (
    type: "page" | "widget" | "element" | "project",
    id: string,
    pid?: string
  ) => void;
  setSelect?: React.Dispatch<React.SetStateAction<ISelect>>;
}

const renderTree = (props: IConfigLayoutRightAsideLayer) => {
  const {
    datas,
    pageId,
    widgetId,
    elementId,
    onSelected,
    pid,
    projectId,
    pageType,
    onEditHandler,
    onDeleteHandler,
    setSelect,
  } = props;
  return datas.map((item, index) => {
    return (
      <div className="cms-config-layout__layer--item" key={index}>
        <div
          className={`title ${
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
          <div
            className="name"
            onClick={() =>
              onSelected?.(
                item.projectId
                  ? "project"
                  : item.pageId
                  ? "page"
                  : item.widgetId
                  ? "widget"
                  : "element",
                item.projectId ||
                  item.pageId ||
                  item.widgetId ||
                  item.elementId,
                pid
              )
            }
          >
            {item.name}
          </div>
          {(item.widgetId &&
            pageType &&
            ["project", "page"].includes(pageType)) ||
          (item.elementId && pageType && ["element"].includes(pageType)) ? (
            <div className="controls">
              <Popover
                content={
                  <div className="project-controls">
                    <p
                      onClick={() =>
                        setSelect?.((state) => ({
                          ...state,
                          name: item.name,
                          pageType: item.projectId
                            ? "project"
                            : item.pageId
                            ? "page"
                            : item.widgetId
                            ? "widget"
                            : "element",
                          pId: pid as string,
                          id:
                            item.projectId ||
                            item.pageId ||
                            item.widgetId ||
                            item.elementId,
                          show: true,
                        }))
                      }
                    >
                      编辑
                    </p>
                    <p
                      onClick={() =>
                        onDeleteHandler?.(
                          item.projectId
                            ? "project"
                            : item.pageId
                            ? "page"
                            : item.widgetId
                            ? "widget"
                            : "element",
                          item.projectId ||
                            item.pageId ||
                            item.widgetId ||
                            item.elementId,
                          pid
                        )
                      }
                    >
                      删除
                    </p>
                  </div>
                }
              >
                <EllipsisOutlined />
              </Popover>
            </div>
          ) : null}
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
              pageType,
              onEditHandler,
              onDeleteHandler,
              setSelect,
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
  pageType,
  onEditHandler,
  onDeleteHandler,
}) => {
  const [select, setSelect] = useState<ISelect>(() => {
    return {
      pageType: "",
      name: "",
      id: "",
      pId: "",
      show: false,
    };
  });
  const modifyNameSuccessHander = useCallback(
    (name: string) => {
      onEditHandler?.(select.pageType as any, select.id, name, select.pId);
    },
    [onEditHandler, select.id, select.pId, select.pageType]
  );
  return (
    <div className="cms-config-layout__layer">
      <ModifyNameDialog
        onClose={() =>
          setSelect((state) => ({
            ...state,
            id: "",
            pId: "",
            name: "",
            pageType: "",
            show: false,
          }))
        }
        name={select.name}
        pageType={select.pageType as PageType}
        open={select.show}
        modifyNameSuccessHander={modifyNameSuccessHander}
      />
      {datas.length ? (
        renderTree({
          datas,
          pageId,
          widgetId,
          elementId,
          onSelected,
          projectId,
          pageType,
          onEditHandler,
          onDeleteHandler,
          setSelect,
        })
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};
