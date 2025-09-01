import React from "react";
import "./index.scss";
import { Tabs, TabsProps } from "antd";
import Elements from "./components/elements";
import { useI18n } from "@src/core/i18n/i18n.hook";

function NewTrend() {
  const { $t } = useI18n();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: $t("home_element" /*组件*/),
      children: <Elements />,
    },
  ];
  return (
    <div className="cms-home__newTrend">
      <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />
    </div>
  );
}

export default NewTrend;
