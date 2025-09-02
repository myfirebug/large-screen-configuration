import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";

import React, { useRef, FC, useEffect, useContext } from "react";
import { IElement } from "@src/service";
import { elements } from "@src/core/hook";
import "./index.scss";
import { LocaleContext } from "@src/core/i18n/localeContent";

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

const Elements: FC<any> = () => {
  const { $t } = useContext(LocaleContext);

  const columns: ProColumns<IElement>[] = [
    {
      title: $t("element_name" /*名称*/),
      dataIndex: "name",
    },
    {
      title: $t("element_img" /*图片*/),
      dataIndex: "url",
      search: false,
      render: (text, record, _, action) => {
        return (
          <img height="60px" src={`./elements/${record.code}.png`} alt="" />
        );
      },
    },
    {
      title: $t("element_type" /*类型*/),
      dataIndex: "type",
      onFilter: true,
      ellipsis: true,
      valueType: "select",
      valueEnum: {
        all: { text: $t("element_all" /*全部*/), status: "" },
        text: {
          text: $t("element_text" /*文本*/),
          status: "text",
        },
        image: {
          text: $t("element_img" /*图片*/),
          status: "image",
        },
        table: {
          text: $t("element_table" /*表格*/),
          status: "table",
        },
        line: {
          text: $t("element_line" /*折线图*/),
          status: "line",
        },
        bar: {
          text: $t("element_bar" /*柱状图*/),
          status: "bar",
        },
        pie: {
          text: $t("element_pie" /*饼图*/),
          status: "pie",
        },
      },
    },
    {
      title: $t("element_component" /*组件*/),
      dataIndex: "element",
      search: false,
    },
    {
      title: $t("element_use_num" /*使用次数*/),
      dataIndex: "count",
      search: false,
    },
    {
      title: $t("element_create_time" /*创建时间*/),
      dataIndex: "createTime",
      valueType: "date",
      hideInSearch: true,
    },
    {
      title: $t("element_create_time" /*创建时间*/),
      dataIndex: "createTime",
      valueType: "dateRange",
      hideInTable: true,
    },
  ];
  const actionRef = useRef<ActionType>();
  const { filterElementsList, getElements, filterHandle } = elements();

  useEffect(() => {
    getElements();
  }, [getElements]);
  return (
    <div className="cms-elements">
      <ProTable<IElement>
        columns={columns}
        actionRef={actionRef}
        // request={async (params) => {
        //   await waitTime(2000);
        //   return API.elementsService.elements({ params }).then((res) => {
        //     console.log(res, params, "res");
        //     return res;
        //   });
        // }}
        dataSource={filterElementsList}
        onSubmit={filterHandle}
        onReset={filterHandle}
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
        headerTitle={$t("element_components_list" /*组件列表*/)}
      />
    </div>
  );
};

export default Elements;
