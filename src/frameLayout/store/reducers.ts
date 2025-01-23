import { MODIFY_TOKEN, REMOVE_TOKEN, USER_INFO, ALL_STATE } from "./type";
import { ModifyActions } from "./action";
import { localStorage } from "@src/utils";
import { STORE_TOKEN, STORE_USER_INFO } from "@src/core/enums/access.enums";

export const initialState: ALL_STATE = {
  token: localStorage.get(STORE_TOKEN) || "",
  userInfo: localStorage.get(STORE_USER_INFO) || null,
};

export const frameLayoutReducer = (
  state = initialState,
  action: ModifyActions
) => {
  switch (action.type) {
    case MODIFY_TOKEN: {
      localStorage.set(STORE_TOKEN, action.data);
      return {
        ...state,
        token: action.data,
      };
    }
    case REMOVE_TOKEN: {
      localStorage.remove(STORE_TOKEN);
      localStorage.remove(STORE_USER_INFO);
      return {
        ...state,
        token: "",
        userInfo: null,
      };
    }
    case USER_INFO: {
      localStorage.set(STORE_USER_INFO, action.data);
      return {
        ...state,
        userInfo: action.data,
      };
    }
    default: {
      console.log("当前类型不存在");
    }
  }
};
