import { ModifyActions } from "./action";
import { ALL_STATE, PAGE, SELECT_WIDGET, SELECT_ELEMENT } from "./type";

export const initialState: ALL_STATE = {
  page: {
    name: "未命名页面",
    id: "",
    createTime: "",
    count: 0,
    configuration: {},
    widgets: [],
    pageId: "",
    screenRatio: "",
  },
  elementId: undefined,
  widgetId: undefined,
  pageId: undefined,
};

export const pageReducer = (state = initialState, action: ModifyActions) => {
  const copy: ALL_STATE = JSON.parse(JSON.stringify(state));
  console.log(state, action);
  switch (action.type) {
    // 获取页面
    case PAGE: {
      copy.page = action.data;
      copy.pageId = action.data.pageId;
      return copy;
    }
    case SELECT_WIDGET: {
      copy.widgetId = action.widgetId;
      return copy;
    }
    case SELECT_ELEMENT: {
      copy.widgetId = action.widgetId;
      copy.elementId = action.elementId;
      return copy;
    }
    default: {
      console.log("你访问的类型不对，请自行检查");
    }
  }
};
