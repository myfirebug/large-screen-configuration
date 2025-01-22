import { MODIFY_THEME_NAME } from "./type";
import { IThemeName } from "../themes";
import { ModifyActions } from "./action";
import { setTheme } from "../index";
import { localStorage } from "@src/utils";
import { CUTTRENT_THEME_NAME } from "@src/core/enums/access.enums";

export const initialState: IThemeName =
  localStorage.get(CUTTRENT_THEME_NAME) || "themeGreen";

export const themeReducer = (
  state: IThemeName = initialState,
  action: ModifyActions
) => {
  switch (action.type) {
    case MODIFY_THEME_NAME: {
      setTheme(action.data);
      localStorage.set(CUTTRENT_THEME_NAME, action.data);
      return action.data;
    }
    default: {
      console.log("当前类型不存在");
    }
  }
};
