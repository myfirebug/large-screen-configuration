/* eslint-disable jsx-a11y/anchor-is-valid */
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, FC, useEffect } from "react";
import { IProject } from "@src/service";
import "./index.scss";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { web } from "@src/core/hook";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const Widgets: FC<any> = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  const { getProjects, projectsFilterHandle, filterProjectsList } = web();
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const columns: ProColumns<IProject>[] = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "date",
      hideInSearch: true,
      width: 150,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "dateRange",
      hideInTable: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 100,
      render: (text, record, _, action) => (
        <div className="option">
          {record.count === 0 ? (
            <span
              key="editable"
              onClick={() => {
                navigate(
                  `/web/project/configuration?pageId=${record.projectId}`
                );
              }}
            >
              编辑
            </span>
          ) : null}
          <span key="view">预览</span>
        </div>
      ),
    },
  ];

  return (
    <div className="cms-project">
      <ProTable<IProject>
        columns={columns}
        actionRef={actionRef}
        // request={async (params) => {
        //   await waitTime(2000);
        //   return API.widgetsService.widgets({ params }).then((res) => {
        //     console.log(res, "res");
        //     return res;
        //   });
        // }}
        rowKey="projectId"
        dataSource={filterProjectsList}
        onSubmit={projectsFilterHandle}
        onReset={projectsFilterHandle}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 20,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="项目列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => navigate("/web/project/configuration")}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
    </div>
  );
};

export default Widgets;
