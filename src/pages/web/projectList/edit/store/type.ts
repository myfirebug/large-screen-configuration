import { IProject } from "@src/service";

// 获取项目
export const PROJECT = "PROJECT";
export type PROJECT_TYPE = typeof PROJECT;

// 修改项目
export const MODIFY_PROJECT = "MODIFY_PROJECT";
export type MODIFY_PROJECT_TYPE = typeof MODIFY_PROJECT;

// 添加微件
export const ADD_WIDGET = "ADD_WIDGET";
export type ADD_WIDGET_TYPE = typeof ADD_WIDGET;

// 删除微件
export const DELETE_WIDGET = "DELETE_WIDGET";
export type DELETE_WIDGET_TYPE = typeof DELETE_WIDGET;

// 修改微件
export const MODIFY_WIDGET = "MODIFY_WIDGET";
export type MODIFY_WIDGET_TYPE = typeof MODIFY_WIDGET;

export interface ALL_STATE {
  project: IProject;
  elementId: string | undefined;
  widgetId: string | undefined;
  pageId: string | undefined;
  projectId: string | undefined;
}
