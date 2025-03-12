import { IPage } from "@src/service";
import { ModifyActions } from "./action";
import {
  ALL_STATE,
  PROJECT,
  MODIFY_PROJECT,
  ADD_WIDGET,
  DELETE_WIDGET,
  MODIFY_WIDGET,
  SELECT_WIDGET,
  SELECT_ELEMENT,
  ADD_PAGE,
  MODIFY_PAGE,
} from "./type";

export const initialState: ALL_STATE = {
  project: {
    name: "未命名页面",
    createTime: "",
    url: "",
    projectId: "",
    configuration: {},
    pages: [],
    screenRatio: "",
  },
  elementId: undefined,
  widgetId: undefined,
  pageId: undefined,
  projectId: undefined,
};

export const projectReducer = (state = initialState, action: ModifyActions) => {
  const copy: ALL_STATE = JSON.parse(JSON.stringify(state));
  // 当前页面
  let currentPage = copy.project.pages.find(
    (item) => item.pageId === copy.pageId
  );
  console.log(state, action);
  switch (action.type) {
    // 获取页面
    case PROJECT: {
      copy.project = action.data;
      copy.pageId = action.data.pages[0]?.pageId;
      copy.projectId = action.data.projectId;
      return copy;
    }
    case MODIFY_PROJECT: {
      copy.project = {
        ...copy.project,
        ...action.data,
      };
      return copy;
    }
    case ADD_WIDGET: {
      (currentPage as IPage).widgets = [
        ...(currentPage as IPage).widgets,
        action.data,
      ];
      copy.widgetId = action.data.widgetId;
      copy.elementId = "";
      console.log(copy, "copy");
      return copy;
    }
    case DELETE_WIDGET: {
      (currentPage as IPage).widgets = (currentPage as IPage).widgets.filter(
        (item) => item.widgetId !== action.id
      );
      if (action.id === copy.widgetId) {
        copy.widgetId = "";
        copy.elementId = "";
      }
      return copy;
    }
    case MODIFY_WIDGET: {
      const index = (currentPage as IPage).widgets.findIndex(
        (item) => item.widgetId === action.data.widgetId
      );
      if (index !== -1) {
        (currentPage as IPage).widgets[index] = {
          ...(currentPage as IPage).widgets[index],
          ...action.data,
        };
      }
      return copy;
    }
    case SELECT_WIDGET: {
      copy.widgetId = action.widgetId;
      copy.elementId = "";
      return copy;
    }
    case SELECT_ELEMENT: {
      copy.widgetId = action.widgetId;
      copy.elementId = action.elementId;
      return copy;
    }
    case ADD_PAGE: {
      copy.project.pages.push(action.data);
      copy.pageId = action.data.pageId;
      return copy;
    }
    case MODIFY_PAGE: {
      const index = copy?.project?.pages?.findIndex(
        (item) => item.pageId === action.data.pageId
      );
      if (index !== -1) {
        copy.project.pages[index] = {
          ...copy.project.pages[index],
          ...action.data,
        };
        copy.pageId = action.data.pageId;
      }
      console.log(copy, "copy");
      return copy;
    }
    default: {
      console.log("你访问的类型不对，请自行检查");
    }
  }
};
