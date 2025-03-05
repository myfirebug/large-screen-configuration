import { ModifyActions } from "./action";
import {
  ALL_STATE,
  PAGE,
  MODIFY_PAGE,
  SELECT_WIDGET,
  SELECT_ELEMENT,
  ADD_WIDGET,
  MODIFY_WIDGET,
  MODIFY_ELEMENT,
} from "./type";

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
    case MODIFY_PAGE: {
      copy.page = {
        ...state.page,
        ...action.data,
      };
      return copy;
    }
    case SELECT_WIDGET: {
      copy.widgetId = action.widgetId;
      copy.elementId = "";
      return copy;
    }
    case ADD_WIDGET: {
      copy.page.widgets = [...copy.page.widgets, action.data];
      copy.widgetId = action.data.widgetId;
      return copy;
    }
    case MODIFY_WIDGET: {
      const index = copy.page.widgets.findIndex(
        (item) => item.widgetId === action.data.widgetId
      );
      if (index !== -1) {
        copy.page.widgets[index] = action.data;
      }
      return copy;
    }
    case SELECT_ELEMENT: {
      copy.widgetId = action.widgetId;
      copy.elementId = action.elementId;
      return copy;
    }
    case MODIFY_ELEMENT: {
      const currentWidgetIndex = copy.page.widgets.findIndex(
        (item) => item.widgetId === copy.widgetId
      );
      if (currentWidgetIndex !== -1) {
        const currentElementIndex = copy.page.widgets[
          currentWidgetIndex
        ].elements.findIndex((item) => item.elementId === copy.elementId);
        if (currentElementIndex !== -1) {
          copy.page.widgets[currentWidgetIndex].elements[currentElementIndex] =
            action.data;
        }
      }
      return copy;
    }
    default: {
      console.log("你访问的类型不对，请自行检查");
    }
  }
};
