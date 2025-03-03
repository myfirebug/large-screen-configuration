import { IPage } from "@src/service";
import { PAGE_TYPE, SELECT_ELEMENT_TYPE, SELECT_WIDGET_TYPE } from "./type";

// 获取页面
export interface widgetAction {
  type: PAGE_TYPE;
  data: IPage;
}

export interface selectWidgetAction {
  type: SELECT_WIDGET_TYPE;
  widgetId: string;
}

export interface selectElementAction {
  type: SELECT_ELEMENT_TYPE;
  widgetId: string;
  elementId: string;
}

export type ModifyActions =
  | widgetAction
  | selectWidgetAction
  | selectElementAction;
