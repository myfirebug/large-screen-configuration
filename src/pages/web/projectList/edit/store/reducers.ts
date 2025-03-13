import { IElement, IPage, IWidget } from "@src/service";
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
  SELECT_PAGE,
  DELETE_PAGE,
  MODIFY_PROJECT_CONFIGUREVALUE,
  MODIFY_ELEMENT,
} from "./type";
import { getPrefixStyle } from "@src/utils";

export const initialState: ALL_STATE = {
  project: {
    name: "未命名项目",
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
  // 当前微件
  let currentWidget = currentPage?.widgets.find(
    (item) => item.widgetId === copy.widgetId
  );
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
    case MODIFY_PROJECT_CONFIGUREVALUE: {
      let data: IAnyObject = getPrefixStyle(action.data, "widget");
      if (JSON.stringify(data) !== "{}") {
        for (let i = 0; i < copy.project.pages.length; i++) {
          for (let j = 0; j < copy.project.pages[i].widgets.length; j++) {
            copy.project.pages[i].widgets[j].configuration = {
              ...copy.project.pages[i].widgets[j].configuration,
              configureValue: {
                ...copy.project.pages[i].widgets[j].configuration
                  ?.configureValue,
                ...data,
              },
            };
          }
        }
      }
      copy.project.configuration = {
        ...copy.project.configuration,
        configureValue: {
          ...copy.project.configuration?.configureValue,
          ...action.data,
        },
      };
      return copy;
    }
    case ADD_WIDGET: {
      let data: IAnyObject = getPrefixStyle(
        copy?.project?.configuration?.configureValue || {},
        "widget"
      );
      let widgets: IWidget[] = [];
      if (Array.isArray(action.data)) {
        widgets = action.data.map((item) => ({
          ...item,
          configuration: {
            ...item?.configuration,
            configureValue: {
              ...item?.configuration?.configureValue,
              ...data,
            },
          },
        }));
      } else {
        copy.widgetId = action.data.widgetId;
        widgets.push({
          ...action.data,
          configuration: {
            ...action?.data?.configuration,
            configureValue: {
              ...action?.data?.configuration?.configureValue,
              ...data,
            },
          },
        });
      }
      (currentPage as IPage).widgets = (currentPage as IPage).widgets.concat(
        widgets
      );
      copy.elementId = "";
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
      copy.elementId = "";
      copy.widgetId = "";
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
        if (copy.pageId !== action.data.pageId) {
          copy.pageId = action.data.pageId;
          copy.widgetId = "";
          copy.elementId = "";
        }
      }
      return copy;
    }
    case SELECT_PAGE: {
      copy.pageId = action.pageId;
      copy.widgetId = "";
      copy.elementId = "";
      return copy;
    }
    case DELETE_PAGE: {
      copy.project.pages =
        copy.project.pages?.filter((item) => item.pageId !== action.pageId) ||
        [];
      if (copy.pageId === action.pageId) {
        copy.pageId = "";
        copy.widgetId = "";
        copy.elementId = "";
      }
      return copy;
    }
    case MODIFY_ELEMENT: {
      const index = currentWidget?.elements?.findIndex(
        (item) => item.elementId === copy.elementId
      );
      if (index !== -1) {
        (currentWidget?.elements as IElement[])[index as number] = {
          ...(currentWidget?.elements as IElement[])[index as number],
          ...action.data,
        };
      }
      console.log(copy, "123");
      return copy;
    }
    default: {
      console.log("你访问的类型不对，请自行检查");
    }
  }
};
