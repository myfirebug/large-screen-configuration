import { IElement, IWidget } from "@src/service";
import {
  WIDGET_TYPE,
  MODIFY_WIDGET_TYPE,
  SELECT_ELEMENT_ID_TYPE,
  MODIFY_ELEMENT_TYPE,
  ADD_ELEMENT_TYPE,
  DELETE_ELEMENT_TYPE,
} from "./type";

export interface widgetAction {
  type: WIDGET_TYPE;
  data: IWidget;
}

export interface modifyWidgetAction {
  type: MODIFY_WIDGET_TYPE;
  data: IAnyObject;
}

export interface addElementAction {
  type: ADD_ELEMENT_TYPE;
  data: IElement;
}

export interface deleteElementAction {
  type: DELETE_ELEMENT_TYPE;
  id: string;
}

export interface selectElementIdAction {
  type: SELECT_ELEMENT_ID_TYPE;
  data: string;
}

export interface modifyElementAction {
  type: MODIFY_ELEMENT_TYPE;
  data: IAnyObject;
}

export type ModifyActions =
  | widgetAction
  | modifyWidgetAction
  | addElementAction
  | deleteElementAction
  | selectElementIdAction
  | modifyElementAction;
