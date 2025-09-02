import React, { Suspense, FC, memo, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes, { IRoute, IMeta } from "./routes";
import lazyLoad from "@src/compoents/lazyLoad";
import { useFrameLayout } from "@src/layout/frameLayout/frameLayoutContext";
import { Spin } from "antd";
import { LocaleContext } from "@src/core/i18n/localeContent";

interface IPrivateRoute {
  children: JSX.Element | null;
  meta: IMeta;
  title: string;
  token: string;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children, meta, title, token }) => {
  const { $t } = useContext(LocaleContext);
  if (title) {
    document.title = $t("login_title") + `-${title}`;
  }
  // 处理未登录情况时跳首页
  if (meta.auth && !token) {
    return <Navigate to="/login" />;
  }
  return children;
};

/**
 * 递归路由
 * @param datas 路由数据
 * @returns
 */
const routeTree = (datas: IRoute[]) => {
  const frameLayout = useFrameLayout();
  return datas.map(({ path, children, modulePath, title, meta, redirect }) => {
    return children && children.length ? (
      <Route
        path={path}
        element={
          modulePath ? (
            <PrivateRoute
              title={title}
              meta={meta}
              token={frameLayout?.token as string}
            >
              {lazyLoad(modulePath)}
            </PrivateRoute>
          ) : null
        }
        key={modulePath}
      >
        {routeTree(children)}
        {redirect ? (
          <Route path={path} element={<Navigate to={redirect} />}></Route>
        ) : (
          <Route
            path={path}
            element={<Navigate to={children[0].path as string} />}
          ></Route>
        )}
      </Route>
    ) : (
      <Route
        path={path}
        element={
          (path as string) === "*" ? (
            <Navigate to="/404" replace />
          ) : modulePath ? (
            <PrivateRoute
              title={title}
              meta={meta}
              token={frameLayout?.token as string}
            >
              {lazyLoad(modulePath)}
            </PrivateRoute>
          ) : null
        }
        key={modulePath}
      ></Route>
    );
  });
};

const RoutesView = memo(
  () => {
    return (
      <Suspense
        fallback={
          <Spin
            tip="Loading"
            size="large"
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 100,
            }}
          ></Spin>
        }
      >
        <Routes>{routeTree(routes)}</Routes>
      </Suspense>
    );
  },
  (a, b) => {
    return true;
  }
);

export default RoutesView;
