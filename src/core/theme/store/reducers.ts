import { MODIFY_THEME_NAME } from "./type";
import { IThemeName } from "../themes";
import { ModifyActions } from "./action";
import { setTheme } from "../index";

export const initialState: IThemeName = "themeGreen";

export const themeReducer = (
  state: IThemeName = initialState,
  action: ModifyActions
) => {
  switch (action.type) {
    case MODIFY_THEME_NAME: {
      setTheme(action.data);
      return action.data;
    }
    default: {
      console.log("当前类型不存在");
    }
  }
};
