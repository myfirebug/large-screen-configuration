import React from "react";
import "./index.scss";

function Statistics() {
  return (
    <div className="cms-home__statistics">
      <div className="cms-home__statistics--item">
        <div className="name">组件</div>
        <div className="value">32,343</div>
        <div className="content">上升5%较上月相比</div>
      </div>
      <div className="cms-home__statistics--item">
        <div className="name">微件</div>
        <div className="value">32,343</div>
        <div className="content">上升5%较上月相比</div>
      </div>
      <div className="cms-home__statistics--item">
        <div className="name">页面</div>
        <div className="value">32,343</div>
        <div className="content">上升5%较上月相比</div>
      </div>
      <div className="cms-home__statistics--item">
        <div className="name">项目</div>
        <div className="value">32,343</div>
        <div className="content">上升5%较上月相比</div>
      </div>
    </div>
  );
}

export default Statistics;
