import { MODIFY_THEME_NAME } from "./type";
import { IThemeName } from "../themes";
import { ModifyActions } from "./action";

export const initialState: IThemeName = "themeBlue";

export const themeReducer = (state = initialState, action: ModifyActions) => {
  switch (action.type) {
    case MODIFY_THEME_NAME: {
      return action.data;
    }
    default: {
      console.log("当前类型不存在");
    }
  }
};
