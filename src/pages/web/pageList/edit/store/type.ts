import { IPage } from "@src/service";

// 获取页面
export const PAGE = "PAGE";
export type PAGE_TYPE = typeof PAGE;

// 选中组件
export const SELECT_WIDGET = "SELECT_WIDGET";
export type SELECT_WIDGET_TYPE = typeof SELECT_WIDGET;

// 选中组件
export const SELECT_ELEMENT = "SELECT_ELEMENT";
export type SELECT_ELEMENT_TYPE = typeof SELECT_ELEMENT;

export interface ALL_STATE {
  page: IPage;
  elementId: string | undefined;
  widgetId: string | undefined;
  pageId: string | undefined;
}
