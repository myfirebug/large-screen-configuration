import { ModifyActions } from "./action";
import {
  ALL_STATE,
  WIDGET,
  MODIFY_ELEMENT,
  MODIFY_WIDGET,
  SELECT_ELEMENT_ID,
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
    header: [],
    body: [],
  },
  elementId: undefined,
};

export const widgetReducer = (state = initialState, action: ModifyActions) => {
  switch (action.type) {
    // 获取微件
    case WIDGET: {
      return {
        ...state,
        ...action.data,
      };
    }
    case MODIFY_WIDGET: {
      return {
        ...state,
        widget: {
          ...state.widget,
          ...action.data,
        },
      };
    }
    case MODIFY_ELEMENT: {
      return state;
    }

    case SELECT_ELEMENT_ID: {
      return state;
    }
    default: {
      console.log("你访问的类型不对，请自行检查");
    }
  }
};
