import { IPage, IProject, IWidget } from "@src/service";
import {
  PROJECT_TYPE,
  MODIFY_PROJECT_TYPE,
  ADD_WIDGET_TYPE,
  DELETE_WIDGET_TYPE,
  MODIFY_WIDGET_TYPE,
  SELECT_WIDGET_TYPE,
  SELECT_ELEMENT_TYPE,
  ADD_PAGE_TYPE,
  MODIFY_PAGE_TYPE,
  SELECT_PAGE_TYPE,
  DELETE_PAGE_TYPE,
  MODIFY_PROJECT_CONFIGUREVALUE_TYPE,
  MODIFY_ELEMENT_TYPE,
} from "./type";

// 获取项目
export interface projectAction {
  type: PROJECT_TYPE;
  data: IProject;
}
// 修改项目
export interface modifyProjectAction {
  type: MODIFY_PROJECT_TYPE;
  data: IAnyObject;
}
// 修改项目的configureValue
export interface modifyProjectConfigureValueAction {
  type: MODIFY_PROJECT_CONFIGUREVALUE_TYPE;
  data: IAnyObject;
}
// 新增微件
export interface addWidgetAction {
  type: ADD_WIDGET_TYPE;
  data: IWidget | IWidget[];
}
// 删除微件
export interface deleteWidgetAction {
  type: DELETE_WIDGET_TYPE;
  id: string;
}

// 修改微件
export interface modifyWidgetAction {
  type: MODIFY_WIDGET_TYPE;
  data: IAnyObject;
}
// 选中微件
export interface selectWidgetAction {
  type: SELECT_WIDGET_TYPE;
  widgetId: string;
}
// 选中组件
export interface selectElementAction {
  type: SELECT_ELEMENT_TYPE;
  widgetId: string;
  elementId: string;
}
// 新增页面
export interface addPageAction {
  type: ADD_PAGE_TYPE;
  data: IPage;
}
// 编辑页面
export interface modifyPageAction {
  type: MODIFY_PAGE_TYPE;
  data: IAnyObject;
}
// 选中页面
export interface selectPageAction {
  type: SELECT_PAGE_TYPE;
  pageId: string;
}
// 删除页面
export interface deletePageAction {
  type: DELETE_PAGE_TYPE;
  pageId: string;
}

// 修改组件
export interface modifyElementAction {
  type: MODIFY_ELEMENT_TYPE;
  data: IAnyObject;
}

export type ModifyActions =
  | projectAction
  | modifyProjectAction
  | addWidgetAction
  | deleteWidgetAction
  | modifyWidgetAction
  | selectWidgetAction
  | selectElementAction
  | addPageAction
  | modifyPageAction
  | selectPageAction
  | deletePageAction
  | modifyProjectConfigureValueAction
  | modifyElementAction;
