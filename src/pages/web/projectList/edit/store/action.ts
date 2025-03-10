import { IProject, IWidget } from "@src/service";
import {
  PROJECT_TYPE,
  MODIFY_PROJECT_TYPE,
  ADD_WIDGET_TYPE,
  DELETE_WIDGET_TYPE,
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

export type ModifyActions =
  | projectAction
  | modifyProjectAction
  | addWidgetAction
  | deleteWidgetAction;
