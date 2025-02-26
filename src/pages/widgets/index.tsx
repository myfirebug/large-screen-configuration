/* eslint-disable jsx-a11y/anchor-is-valid */
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, FC, useEffect } from "react";
import { IWidget } from "@src/service";
import "./index.scss";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { widgets } from "@src/core/hook";

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

  const { filterWidgetsList, getWidgets, filterHandle } = widgets();

  useEffect(() => {
    getWidgets();
  }, [getWidgets]);

  const columns: ProColumns<IWidget>[] = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "图片",
      dataIndex: "url",
      search: false,
      render: (text, record, _, action) => {
        return <img src={text as string} alt="" />;
      },
    },
    {
      title: "类型",
      dataIndex: "type",
      onFilter: true,
      ellipsis: true,
      valueType: "select",
      valueEnum: {
        all: { text: "全部", status: "" },
        text: {
          text: "文本",
          status: "text",
        },
        image: {
          text: "图片",
          status: "image",
        },
        table: {
          text: "表格",
          status: "table",
        },
        line: {
          text: "折线图",
          status: "line",
        },
        bar: {
          text: "柱状图",
          status: "bar",
        },
        pie: {
          text: "饼图",
          status: "pie",
        },
      },
    },
    {
      title: "使用次数",
      dataIndex: "count",
      search: false,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "date",
      hideInSearch: true,
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
      render: (text, record, _, action) => (
        <div className="option">
          {record.count === 0 ? (
            <span
              key="editable"
              onClick={() => {
                navigate(`/widgets/configuration?widgetId=${record.widgetId}`);
              }}
            >
              编辑
            </span>
          ) : null}
          ,<span key="view">预览</span>
        </div>
      ),
    },
  ];

  return (
    <div className="cms-widgets">
      <ProTable<IWidget>
        columns={columns}
        actionRef={actionRef}
        // request={async (params) => {
        //   await waitTime(2000);
        //   return API.widgetsService.widgets({ params }).then((res) => {
        //     console.log(res, "res");
        //     return res;
        //   });
        // }}
        rowKey="widgetId"
        dataSource={filterWidgetsList}
        onSubmit={filterHandle}
        onReset={filterHandle}
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
        headerTitle="微件列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => navigate("/widgets/configuration")}
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
