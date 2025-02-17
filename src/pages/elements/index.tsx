import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";

import React, { useRef, FC } from "react";
import { API, IElement } from "@src/service";
import "./index.scss";

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

const columns: ProColumns<IElement>[] = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "图片",
    dataIndex: "url",
    search: false,
    render: (text, record, _, action) => {
      return <img height="60px" src={`./elements/${record.code}.png`} alt="" />;
    },
  },
  {
    title: "类型",
    dataIndex: "type",
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    valueEnum: {
      all: { text: "全部" },
      open: {
        text: "基础文本",
        status: "baseText",
      },
    },
  },
  {
    title: "组件",
    dataIndex: "element",
    search: false,
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
];

const Elements: FC<any> = () => {
  const actionRef = useRef<ActionType>();
  return (
    <div className="cms-elements">
      <ProTable<IElement>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          await waitTime(2000);
          return API.elementsService.elements({ params }).then((res) => {
            console.log(res, "res");
            return res;
          });
        }}
        rowKey="id"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 15,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="组件列表"
      />
    </div>
  );
};

export default Elements;
