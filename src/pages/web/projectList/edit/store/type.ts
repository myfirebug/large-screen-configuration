import { IProject } from "@src/service";

// 获取项目
export const PROJECT = "PROJECT";
export type PROJECT_TYPE = typeof PROJECT;

// 修改项目
export const MODIFY_PROJECT = "MODIFY_PROJECT";
export type MODIFY_PROJECT_TYPE = typeof MODIFY_PROJECT;

// 修改项目的configureValue
export const MODIFY_PROJECT_CONFIGUREVALUE = "MODIFY_PROJECT_CONFIGUREVALUE";
export type MODIFY_PROJECT_CONFIGUREVALUE_TYPE =
  typeof MODIFY_PROJECT_CONFIGUREVALUE;

// 添加微件
export const ADD_WIDGET = "ADD_WIDGET";
export type ADD_WIDGET_TYPE = typeof ADD_WIDGET;

// 删除微件
export const DELETE_WIDGET = "DELETE_WIDGET";
export type DELETE_WIDGET_TYPE = typeof DELETE_WIDGET;

// 修改微件
export const MODIFY_WIDGET = "MODIFY_WIDGET";
export type MODIFY_WIDGET_TYPE = typeof MODIFY_WIDGET;

// 选中微件
export const SELECT_WIDGET = "SELECT_WIDGET";
export type SELECT_WIDGET_TYPE = typeof SELECT_WIDGET;

// 选中组件
export const SELECT_ELEMENT = "SELECT_ELEMENT";
export type SELECT_ELEMENT_TYPE = typeof SELECT_ELEMENT;

// 增加页面
export const ADD_PAGE = "ADD_PAGE";
export type ADD_PAGE_TYPE = typeof ADD_PAGE;

// 编辑页面
export const MODIFY_PAGE = "MODIFY_PAGE";
export type MODIFY_PAGE_TYPE = typeof MODIFY_PAGE;

// 选中页面
export const SELECT_PAGE = "SELECT_PAGE";
export type SELECT_PAGE_TYPE = typeof SELECT_PAGE;
// 删除页面
export const DELETE_PAGE = "DELETE_PAGE";
export type DELETE_PAGE_TYPE = typeof DELETE_PAGE;

// 修改组件
export const MODIFY_ELEMENT = "MODIFY_ELEMENT";
export type MODIFY_ELEMENT_TYPE = typeof MODIFY_ELEMENT;

export interface ALL_STATE {
  project: IProject;
  elementId: string | undefined;
  widgetId: string | undefined;
  pageId: string | undefined;
  projectId: string | undefined;
}
