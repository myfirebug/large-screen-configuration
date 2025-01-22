import { MODIFY_TOKEN, ALL_STATE } from "./type";
import { ModifyActions } from "./action";
import { localStorage } from "@src/utils";
import { STORE_TOKEN } from "@src/core/enums/access.enums";

export const initialState: ALL_STATE = {
  token: localStorage.get(STORE_TOKEN) || "",
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
    default: {
      console.log("当前类型不存在");
    }
  }
};
