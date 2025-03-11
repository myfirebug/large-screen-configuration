import { IProject, IWidget } from "@src/service";
import {
  PROJECT_TYPE,
  MODIFY_PROJECT_TYPE,
  ADD_WIDGET_TYPE,
  DELETE_WIDGET_TYPE,
  MODIFY_WIDGET_TYPE,
  SELECT_WIDGET_TYPE,
  SELECT_ELEMENT_TYPE,
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
// 新增微件
export interface addWidgetAction {
  type: ADD_WIDGET_TYPE;
  data: IWidget;
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

export type ModifyActions =
  | projectAction
  | modifyProjectAction
  | addWidgetAction
  | deleteWidgetAction
  | modifyWidgetAction
  | selectWidgetAction
  | selectElementAction;
