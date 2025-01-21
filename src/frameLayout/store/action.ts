import { MODIFY_TOKEN_TYPE } from "./type";
// 修改主题
export interface modifyTokenAction {
  type: MODIFY_TOKEN_TYPE;
  data: string;
}

export type ModifyActions = modifyTokenAction;
