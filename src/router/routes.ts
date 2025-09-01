import { useI18n } from "@src/core/i18n/i18n.hook";
import { NonIndexRouteObject } from "react-router-dom";

export interface IMeta {
  // 是否需要token
  auth: boolean;
  // 是否全屏
  fullScreen?: boolean;
  // 是否是菜单
  menu?: boolean;
}

export interface IRoute extends NonIndexRouteObject {
  // 页面标题
  title: string;
  // 模块路径在template模块下的路径
  modulePath: string;
  meta: IMeta;
  // 子路由
  children?: IRoute[];
  // 访问的兄弟路由不存在时，重定向到该路由
  redirect?: string;
  state?: any;
  icon?: string;
}

const { $t } = useI18n();

const routerDatas: IRoute[] = [
  {
    path: "/",
    title: "",
    modulePath: "layout",
    meta: {
      auth: false,
      fullScreen: true,
    },
    children: [
      {
        path: "/login",
        title: $t("frame_route_login" /*登录*/),
        redirect: "/login",
        modulePath: "login",
        meta: {
          auth: false,
          fullScreen: true,
          menu: false,
        },
      },
      {
        path: "/home",
        title: $t("frame_route_home" /*首页*/),
        modulePath: "home",
        icon: "&#xe8b9;",
        meta: {
          auth: true,
          menu: true,
        },
      },
      {
        path: "/elements",
        title: $t("frame_route_element" /*组件*/),
        modulePath: "elements",
        icon: "&#xe640;",
        meta: {
          auth: true,
          menu: true,
        },
      },
      {
        path: "/widgets",
        title: $t("frame_route_widget" /*微件*/),
        modulePath: "widgets",
        icon: "&#xe634;",
        meta: {
          auth: true,
          menu: true,
        },
      },
      {
        path: "/widgets/configuration",
        title: $t("frame_route_widget_config" /*微件配置*/),
        modulePath: "widgets/edit",
        meta: {
          fullScreen: true,
          auth: true,
          menu: false,
        },
      },
      {
        path: "/web",
        title: $t("frame_route_pc" /*电脑端*/),
        icon: "&#xe61f;",
        modulePath: "",
        meta: {
          auth: true,
          menu: true,
        },
        children: [
          {
            path: "/web/page-list",
            title: $t("frame_route_pc_page_temp_list" /*页面模版列表*/),
            modulePath: "web/pageList",
            meta: {
              auth: true,
              menu: true,
            },
          },
          {
            path: "/web/page/configuration",
            title: $t("frame_route_pc_page_temp_config" /*页面模版配置*/),
            modulePath: "web/pageList/edit",
            meta: {
              fullScreen: true,
              auth: true,
            },
          },
          {
            path: "/web/project-list",
            title: $t("frame_route_pc_project_list" /*项目列表*/),
            modulePath: "web/projectList",
            meta: {
              auth: true,
              menu: true,
            },
          },
          {
            path: "/web/project/configuration",
            title: $t("frame_route_pc_project_config" /*项目配置*/),
            modulePath: "web/projectList/edit",
            meta: {
              fullScreen: true,
              auth: true,
            },
          },
        ],
      },
      {
        path: "/404",
        title: "404",
        modulePath: "notFound",
        meta: {
          auth: false,
          menu: false,
        },
      },
      {
        path: "*",
        title: "404",
        modulePath: "",
        meta: {
          auth: false,
        },
      },
    ],
  },
];

export default routerDatas;
