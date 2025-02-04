import { IWidget } from "@src/service";

// 获取微件
export const WIDGET = "WIDGET";
export type WIDGET_TYPE = typeof WIDGET;

// 修改微件
export const MODIFY_WIDGET = "MODIFY_WIDGET";
export type MODIFY_WIDGET_TYPE = typeof MODIFY_WIDGET;

// 新增组件
export const ADD_ELEMENT = "ADD_ELEMENT";
export type ADD_ELEMENT_TYPE = typeof ADD_ELEMENT;

// 选中组件
export const SELECT_ELEMENT_ID = "SELECT_ELEMENT_ID";
export type SELECT_ELEMENT_ID_TYPE = typeof SELECT_ELEMENT_ID;

// 修改组件
export const MODIFY_ELEMENT = "MODIFY_ELEMENT";
export type MODIFY_ELEMENT_TYPE = typeof MODIFY_ELEMENT;

export interface ALL_STATE {
  widget: IWidget;
  elementId: string | undefined;
}
