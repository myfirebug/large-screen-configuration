import React from "react";
import "./index.scss";
import { Tabs, TabsProps } from "antd";
import Elements from "./components/elements";

function NewTrend() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "组件",
      children: <Elements />,
    },
    {
      key: "2",
      label: "微件",
      children: <></>,
    },
    {
      key: "3",
      label: "页面",
      children: <></>,
    },
    {
      key: "4",
      label: "项目",
      children: <></>,
    },
  ];
  return (
    <div className="cms-home__newTrend">
      <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />
    </div>
  );
}

export default NewTrend;
