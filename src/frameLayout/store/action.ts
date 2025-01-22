import { MODIFY_TOKEN_TYPE, REMOVE_TOKEN_TYPE } from "./type";
// 修改token
export interface modifyTokenAction {
  type: MODIFY_TOKEN_TYPE;
  data: string;
}

// 删除token
export interface removeTokenAction {
  type: REMOVE_TOKEN_TYPE;
}

export type ModifyActions = modifyTokenAction | removeTokenAction;
