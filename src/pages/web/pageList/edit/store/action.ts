import { IPage, IWidget } from "@src/service";
import {
  PAGE_TYPE,
  SELECT_ELEMENT_TYPE,
  SELECT_WIDGET_TYPE,
  ADD_WIDGET_TYPE,
  MODIFY_WIDGET_TYPE,
  MODIFY_PAGE_TYPE,
} from "./type";

// 获取页面
export interface pageAction {
  type: PAGE_TYPE;
  data: IPage;
}

export interface modifyPageAction {
  type: MODIFY_PAGE_TYPE;
  data: IAnyObject;
}

export interface selectWidgetAction {
  type: SELECT_WIDGET_TYPE;
  widgetId: string;
}

export interface addWidgetAction {
  type: ADD_WIDGET_TYPE;
  data: IWidget;
}

export interface modifyWidgetAction {
  type: MODIFY_WIDGET_TYPE;
  data: IWidget;
}

export interface selectElementAction {
  type: SELECT_ELEMENT_TYPE;
  widgetId: string;
  elementId: string;
}

export type ModifyActions =
  | pageAction
  | modifyPageAction
  | selectWidgetAction
  | modifyWidgetAction
  | addWidgetAction
  | selectElementAction;
