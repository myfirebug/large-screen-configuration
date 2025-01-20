import { MODIFY_THEME_NAME_TYPE } from "./type";
import { IThemeName } from "../themes";
// 修改主题
export interface modifyThemeNameAction {
  type: MODIFY_THEME_NAME_TYPE;
  data: IThemeName;
}

export type ModifyActions = modifyThemeNameAction;
