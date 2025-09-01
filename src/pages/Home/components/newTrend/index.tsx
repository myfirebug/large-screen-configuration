import React, { useContext } from "react";
import "./index.scss";
import { Tabs, TabsProps } from "antd";
import Elements from "./components/elements";
import { LocaleContext } from "@src/core/i18n/localeContent";

function NewTrend() {
  const { $t } = useContext(LocaleContext);
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
