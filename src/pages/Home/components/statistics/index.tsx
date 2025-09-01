import React, { useContext } from "react";
import "./index.scss";
import { LocaleContext } from "@src/core/i18n/localeContent";

function Statistics() {
  const { $t } = useContext(LocaleContext);
  return (
    <div className="cms-home__statistics">
      <div className="cms-home__statistics--item">
        <div className="name">{$t("home_element" /*组件*/)}</div>
        <div className="value">32,343</div>
        <div className="content">
          {$t("home_up" /*上升[0]%较上月相比*/, [5])}
        </div>
      </div>
      <div className="cms-home__statistics--item">
        <div className="name">{$t("home_widget" /*微件*/)}</div>
        <div className="value">32,343</div>
        <div className="content">
          {$t("home_up" /*上升[0]%较上月相比*/, [6])}
        </div>
      </div>
      <div className="cms-home__statistics--item">
        <div className="name">{$t("home_page" /*页面*/)}</div>
        <div className="value">32,343</div>
        <div className="content">
          {$t("home_up" /*上升[%]较上月相比*/, [7])}
        </div>
      </div>
      <div className="cms-home__statistics--item">
        <div className="name">{$t("home_project" /*项目*/)}</div>
        <div className="value">32,343</div>
        <div className="content">
          {$t("home_up" /*上升[0]%较上月相比*/, [8])}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
