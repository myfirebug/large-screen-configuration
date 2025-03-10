import React, { FC, useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import routerDatas, { IRoute } from "@src/router/routes";
import "./index.scss";
interface IAside {}
type MenuItem = Required<MenuProps>["items"][number];

const Aside: FC<IAside> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    if (pathname !== "/404") {
      setSelectedKeys([pathname]);
      const arr = pathname.split("/");
      if (arr.length > 2) {
        let keys = [];
        for (let i = 2; i < arr.length; i++) {
          keys.push(arr.slice(0, i).join("/"));
        }
        setOpenKeys(keys);
      }
    }
  }, [pathname]);

  const recursionTree = (tree: IRoute[]): any => {
    return tree
      .filter((item) => item.meta.menu)
      .map((item) => ({
        key: item.path,
        label: item.title,
        icon: (
          <span
            className="cms-icon"
            style={{ fontSize: "18px" }}
            dangerouslySetInnerHTML={{
              __html: item.icon as string,
            }}
          ></span>
        ),
        children:
          Array.isArray(item.children) &&
          item.children.findIndex((subItem) => subItem.meta.menu) !== -1
            ? recursionTree(item.children)
            : null,
      }));
  };

  const items: MenuItem[] = recursionTree(routerDatas[0].children as IRoute[]);

  // 选中菜单
  const onSelect = (item: any) => {
    navigate(item.key);
  };

  // 菜单展开
  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys.slice(openKeys.length - 1));
  };

  return (
    <div className="cms-frame-layout__aside">
      <Menu
        className="cms-menu"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        mode="inline"
        items={items}
        theme="dark"
        onSelect={onSelect}
        inlineCollapsed={true}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};
export default Aside;
