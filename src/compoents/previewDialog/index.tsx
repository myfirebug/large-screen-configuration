import React, { FC, useEffect, useMemo, useState } from "react";
import { Modal, ModalProps } from "antd";
import "./index.scss";
import { IPage, IProject, IWidget } from "@src/service";
import RenderWidget from "../renderWidget";
import RenderPage from "../renderPage";
import Navigation from "../navigation";
interface IPreviewDialogProps extends ModalProps {
  pageType?: PageType;
  data?: any;
}

// 微件渲染
const widget = (data: IWidget) => {
  const [diffData, setDiffData] = useState<IWidget>(() => {
    return data;
  });
  useEffect(() => {
    setDiffData(data);
  }, [data]);
  return (
    <RenderWidget
      data={diffData}
      configureValue={diffData?.configuration?.configureValue}
      isDroppable={true}
      isResizable={true}
      staticed={true}
      onChangeParams={(data, widgetId) => {
        console.log(data, widgetId, "data");
        setDiffData((state) => ({
          ...state,
          configuration: {
            ...state?.configuration,
            dataValue: {
              ...state?.configuration?.dataValue,
              params: {
                ...state?.configuration?.dataValue?.params,
                ...data,
              },
            },
          },
        }));
      }}
    />
  );
};
// 渲染页面
const page = (data: IPage) => {
  const [diffData, setDiffData] = useState<IPage>(() => {
    return data;
  });
  useEffect(() => {
    setDiffData(data);
  }, [data]);

  return (
    <RenderPage
      data={diffData || {}}
      configureValue={diffData?.configuration?.configureValue}
      widgets={diffData?.widgets || []}
      onChangeParams={(data, widgetId) => {
        console.log(data, widgetId, "data");
        setDiffData((state) => {
          const copy = JSON.parse(JSON.stringify(state));
          const index = copy?.widgets.findIndex(
            (item: IWidget) => item.widgetId === widgetId
          );
          if (index !== -1) {
            copy.widgets[index] = {
              ...copy.widgets[index],
              configuration: {
                ...copy.widgets[index]?.configuration,
                dataValue: {
                  ...copy.widgets[index]?.configuration?.dataValue,
                  params: {
                    ...copy.widgets[index]?.configuration?.dataValue?.params,
                    ...data,
                  },
                },
              },
            };
          }
          return copy;
        });
      }}
    />
  );
};

// 渲染项目
const project = (data: IProject) => {
  const [diffData, setDiffData] = useState<IProject>(() => {
    return data;
  });
  const [pageId, setPageId] = useState("");

  const currentPage = useMemo(() => {
    return diffData?.pages.find((item) => item.pageId === pageId);
  }, [diffData?.pages, pageId]);
  useEffect(() => {
    setDiffData(data);
    setPageId(data?.pages?.[0]?.pageId);
  }, [data]);
  return (
    <>
      <RenderPage
        data={diffData || {}}
        configureValue={diffData?.configuration?.configureValue}
        widgets={currentPage?.widgets || []}
        onChangeParams={(data, widgetId) => {
          const copy: IProject = JSON.parse(JSON.stringify(diffData));
          // 当前页面
          let currentPage = copy.pages.find((item) => item.pageId === pageId);
          const index = currentPage?.widgets?.findIndex(
            (item) => item.widgetId === widgetId
          );
          if (typeof index === "number") {
            (currentPage as IPage).widgets[index] = {
              ...(currentPage as IPage).widgets[index],
              configuration: {
                ...(currentPage as IPage).widgets[index]?.configuration,
                dataValue: {
                  ...(currentPage as IPage).widgets[index]?.configuration
                    ?.dataValue,
                  params: {
                    ...(currentPage as IPage).widgets[index]?.configuration
                      ?.dataValue?.params,
                    ...data,
                  },
                },
              },
            };
            setDiffData(copy);
          }
        }}
      />
      <Navigation
        configureValue={diffData?.configuration?.configureValue}
        datas={diffData?.pages}
        selectedId={pageId as string}
        onChange={(pageId: string) => {
          setPageId(pageId);
        }}
      />
    </>
  );
};

const PreviewDialog: FC<IPreviewDialogProps> = ({
  open,
  onClose,
  title,
  width,
  height,
  pageType = "widget",
  data,
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
          position: "relative",
        }}
        className="cms-preview-dialog"
      >
        {pageType === "widget" ? widget(data) : null}
        {pageType === "page" ? page(data) : null}
        {pageType === "project" ? project(data) : null}
      </div>
    </Modal>
  );
};

export default PreviewDialog;
