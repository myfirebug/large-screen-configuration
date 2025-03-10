import { ModifyActions } from "./action";
import { ALL_STATE, PROJECT } from "./type";

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
  switch (action.type) {
    // 获取页面
    case PROJECT: {
      copy.project = action.data;
      copy.pageId = action.data.pages[0]?.pageId;
      copy.projectId = action.data.projectId;
      return copy;
    }
    default: {
      console.log("你访问的类型不对，请自行检查");
    }
  }
};
