import { MODIFY_TOKEN, ALL_STATE } from "./type";
import { ModifyActions } from "./action";

export const initialState: ALL_STATE = {
  token: "",
};

export const frameLayoutReducer = (
  state = initialState,
  action: ModifyActions
) => {
  switch (action.type) {
    case MODIFY_TOKEN: {
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
