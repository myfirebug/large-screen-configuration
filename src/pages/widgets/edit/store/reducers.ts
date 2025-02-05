import { IElement } from "@src/service";
import { ModifyActions } from "./action";
import {
  ALL_STATE,
  WIDGET,
  MODIFY_ELEMENT,
  MODIFY_WIDGET,
  SELECT_ELEMENT_ID,
  ADD_ELEMENT,
} from "./type";

export const initialState: ALL_STATE = {
  widget: {
    name: "未命名微件",
    url: "",
    id: "",
    createTime: "",
    type: "text",
    count: 0,
    x: 0,
    y: 0,
    column: 1,
    row: 1,
    configuration: {},
    elements: [],
  },
  elementId: undefined,
};

export const widgetReducer = (state = initialState, action: ModifyActions) => {
  const copy: ALL_STATE = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // 获取微件
    case WIDGET: {
      return {
        ...copy,
        ...action.data,
      };
    }
    case MODIFY_WIDGET: {
      copy.widget = {
        ...copy.widget,
        ...action.data,
      };
      return copy;
    }
    case ADD_ELEMENT: {
      copy.widget.elements.push(action.data);
      return copy;
    }

    case MODIFY_ELEMENT: {
      const index = copy.widget.elements.findIndex(
        (item) => item.elementId === action.data.elementId
      );
      if (index !== -1) {
        copy.widget.elements[index] = { ...action.data } as IElement;
      }
      return copy;
    }

    case SELECT_ELEMENT_ID: {
      return state;
    }
    default: {
      console.log("你访问的类型不对，请自行检查");
    }
  }
};
