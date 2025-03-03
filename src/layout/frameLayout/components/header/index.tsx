import React, { FC, useState, useEffect } from "react";
import { getParentsById } from "@src/utils";
import routerDatas, { IRoute } from "@src/router/routes";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, Dropdown, MenuProps } from "antd";
import { LoginOutlined, DownOutlined } from "@ant-design/icons";

import { useThemeDispatch, useTheme } from "@src/core/theme/themeContext";
import { themeList } from "@src/core/theme/themes";
import "./index.scss";
import {
  useFrameLayout,
  useFrameLayoutDispatch,
} from "@src/layout/frameLayout/frameLayoutContext";
import { useInfo } from "@src/core/hook";

interface IHeader {}

const Header: FC<IHeader> = () => {
  const { pathname } = useLocation();
  const [breadcrumb, setBreadcrumb] = useState<any[]>([]);
  const themeDispatch = useThemeDispatch();
  const theme = useTheme();
  const frameLayout = useFrameLayout();
  const frameLayoutDispatch = useFrameLayoutDispatch();
  const { getUserInfo } = useInfo();
  useEffect(() => {
    setBreadcrumb(() => {
      const result = getParentsById(
        routerDatas[0].children as IRoute[],
        pathname
      );
      return result ? result.reverse() : [];
    });
  }, [pathname]);

  useEffect(() => {
    if (!frameLayout?.userInfo) {
      getUserInfo((data) => {
        frameLayoutDispatch({
          type: "USER_INFO",
          data: data,
        });
      });
    }
  }, [frameLayout?.userInfo, frameLayoutDispatch, getUserInfo]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() =>
            frameLayoutDispatch({
              type: "REMOVE_TOKEN",
            })
          }
        >
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
        <div className="cms-theme__select">
          <div className="cms-theme__select--header"></div>
          <div className="cms-theme__select--body">
            {themeList.map((item) => (
              <div
                className="cms-theme__select--item"
                key={item.name}
                onClick={() => {
                  theme !== item.name &&
                    themeDispatch({
                      type: "MODIFY_THEME_NAME",
                      data: item.name,
                    });
                }}
                style={{ background: item.bgColor }}
              ></div>
            ))}
          </div>
        </div>
        <Dropdown menu={{ items }} overlayClassName="cms-user-dropdown">
          <div className="cms-user">
            <div className="cms-avatar">
              <img alt="" />
            </div>
            <span className="cms-user__name">
              欢迎 <b>{frameLayout?.userInfo?.username || "--"}</b>
            </span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
export default Header;
