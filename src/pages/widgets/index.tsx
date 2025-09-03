/* eslint-disable jsx-a11y/anchor-is-valid */
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, FC, useEffect, useState, useContext } from "react";
import { IWidget } from "@src/service";
import "./index.scss";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { widgets } from "@src/core/hook";
import PreviewDialog from "@src/compoents/previewDialog";
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

const Widgets: FC<any> = () => {
  const { $t } = useContext(LocaleContext);
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [widget, setWidget] = useState<IWidget>();

  const { filterWidgetsList, getWidgets, filterHandle } = widgets();

  useEffect(() => {
    getWidgets();
  }, [getWidgets]);

  const columns: ProColumns<IWidget>[] = [
    {
      title: $t("widget_name" /*名称*/),
      dataIndex: "name",
      width: 250,
    },
    {
      title: $t("widget_img" /*图片*/),
      dataIndex: "url",
      search: false,
      render: (text, record, _, action) => {
        return <img src={text as string} alt="" width={150} />;
      },
    },
    {
      title: $t("widget_type" /*类型*/),
      dataIndex: "type",
      onFilter: true,
      ellipsis: true,
      valueType: "select",
      width: 100,
      valueEnum: {
        all: { text: $t("widget_all" /*全部*/), status: "" },
        text: {
          text: $t("widget_text" /*文本*/),
          status: "text",
        },
        image: {
          text: $t("widget_img" /*图片*/),
          status: "image",
        },
        table: {
          text: $t("widget_table" /*表格*/),
          status: "table",
        },
        line: {
          text: $t("widget_line" /*折线图*/),
          status: "line",
        },
        bar: {
          text: $t("widget_bar" /*柱状图*/),
          status: "bar",
        },
        pie: {
          text: $t("widget_pie" /*饼图*/),
          status: "pie",
        },
      },
    },
    {
      title: $t("widget_use_num" /*使用次数*/),
      dataIndex: "count",
      search: false,
      width: 100,
    },
    {
      title: $t("widget_create_time" /*创建时间*/),
      dataIndex: "createTime",
      valueType: "date",
      hideInSearch: true,
      width: 150,
    },
    {
      title: $t("widget_create_time" /*创建时间*/),
      dataIndex: "createTime",
      valueType: "dateRange",
      hideInTable: true,
    },
    {
      title: $t("widget_operation" /*操作*/),
      valueType: "option",
      key: "option",
      width: 120,
      render: (text, record, _, action) => (
        <div className="option">
          <span
            key="view"
            onClick={() => {
              setShow(true);
              setWidget(record);
            }}
          >
            {$t("operation_view" /*预览*/)}
          </span>
          {record.count === 0 ? (
            <>
              <span
                key="editable"
                onClick={() => {
                  navigate(`/widgets/configuration?widgetId=${record.id}`);
                }}
              >
                {$t("operation_edit" /*编辑*/)}
              </span>
              <span key="delete">{$t("operation_delete" /*删除*/)}</span>
            </>
          ) : null}
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
        headerTitle={$t("widget_list" /*微件列表*/)}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => navigate("/widgets/configuration")}
            type="primary"
          >
            {$t("operation_create" /*新建*/)}
          </Button>,
        ]}
      />
      {/* 预览功能 */}
      <PreviewDialog
        open={show}
        data={widget}
        pageType="widget"
        onClose={() => setShow(false)}
        title="微件预览"
        width={widget?.configuration?.configureValue?.widgetConfigWidth || 600}
        height={
          widget?.configuration?.configureValue?.widgetConfigHeight || 400
        }
      ></PreviewDialog>
    </div>
  );
};

export default Widgets;
