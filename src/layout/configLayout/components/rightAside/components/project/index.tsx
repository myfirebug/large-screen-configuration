import React, { FC, useState } from "react";
import { Button, Empty, Form, Popover } from "antd";
import DynamicForm from "../dynamicForm";
import { projectConfig } from "@src/core/config/base";
import "./index.scss";
import { IPage } from "@src/service";
import AddOrmodifyPageNameDialog from "../addOrmodifyPageNameDialog";
import { EllipsisOutlined } from "@ant-design/icons";

interface IConfigLayoutRightAsideProject {
  configureValue: IAnyObject;
  onFinish: (data: IAnyObject) => void;
  pages: IPage[];
  pageId: string | undefined;
  addPageHandler: (name: string) => void;
}

export const ConfigLayoutRightAsideProject: FC<
  IConfigLayoutRightAsideProject
> = ({ configureValue, onFinish, pages, pageId, addPageHandler }) => {
  const [form] = Form.useForm();
  const [pageDialogStatus, setPageDialogStatus] = useState(false);
  const [name, setName] = useState("");
  return (
    <div className="cms-config-layout__project">
      <AddOrmodifyPageNameDialog
        onClose={() => setPageDialogStatus(false)}
        name={name}
        open={pageDialogStatus}
        onFinishHandler={(name) => {
          addPageHandler(name);
        }}
      />
      <div className="page">
        <div className="page-header">页面列表</div>
        <div className="page-body">
          {pages.length ? (
            <ul className="pag-list">
              {pages.map((item) => (
                <li
                  className={`page-item ${
                    item.pageId === pageId ? "is-active" : ""
                  }`}
                  key={item.pageId}
                >
                  <div className="name">{item.name}</div>
                  <div className="controls">
                    <Popover
                      content={
                        <div className="project-controls">
                          <p
                            onClick={() => {
                              setName(item.name);
                              setPageDialogStatus(true);
                            }}
                          >
                            编辑
                          </p>
                          <p>删除</p>
                        </div>
                      }
                    >
                      <EllipsisOutlined />
                    </Popover>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
        <div className="page-footer">
          <Button
            type="primary"
            block
            onClick={() => {
              setName("");
              setPageDialogStatus(true);
            }}
          >
            添加页面
          </Button>
        </div>
      </div>
      <Form
        labelCol={{ flex: "80px" }}
        labelAlign="left"
        form={form}
        initialValues={configureValue}
      >
        <DynamicForm
          datas={projectConfig.configure || []}
          form={form}
          callback={(field: string, value: any) => {
            const val =
              value && !isNaN(value) && typeof value !== "boolean"
                ? Number(value)
                : value;
            if (configureValue[field] !== val) {
              onFinish({
                [field]: val,
              });
            }
          }}
        />
      </Form>
    </div>
  );
};
