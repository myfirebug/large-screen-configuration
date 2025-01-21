import React, { FC, useState, useEffect } from "react";
import { getParentsById } from "@src/utils";
import routerDatas, { IRoute } from "@src/router/routes";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, Dropdown, MenuProps } from "antd";
import { LoginOutlined, DownOutlined } from "@ant-design/icons";
import "./index.scss";

interface IHeader {}

const Header: FC<IHeader> = () => {
  const { pathname } = useLocation();
  const [breadcrumb, setBreadcrumb] = useState<any[]>([]);
  useEffect(() => {
    setBreadcrumb(() => {
      const result = getParentsById(
        routerDatas[0].children as IRoute[],
        pathname
      );
      return result ? result.reverse() : [];
    });
  }, [pathname]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <LoginOutlined />
          退出登录
        </div>
      ),
    },
  ];
  return (
    <div className="cms-frame-layout__header">
      <div className="cms-frame-layout__header--left">
        <div className="cms-icon">&#xe605;</div>
        <h1>大屏管理系统</h1>
        {breadcrumb && breadcrumb.length ? (
          <Breadcrumb
            items={breadcrumb.map((item: any) => ({
              title: item.path ? (
                <Link to={item.path}>{item.name}</Link>
              ) : (
                item.name
              ),
            }))}
          ></Breadcrumb>
        ) : null}
      </div>
      <div></div>
      <div className="cms-frame-layout__header--right">
        <Dropdown menu={{ items }} overlayClassName="cms-user-dropdown">
          <div className="cms-user">
            <div className="cms-avatar">
              <img alt="" />
            </div>
            <span className="cms-user__name">
              欢迎 <b>admin</b>
            </span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
export default Header;
