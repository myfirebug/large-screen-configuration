import { IuserInfo } from "@src/service";
import { MODIFY_TOKEN_TYPE, REMOVE_TOKEN_TYPE, USER_INFO_TYPE } from "./type";
// 修改token
export interface modifyTokenAction {
  type: MODIFY_TOKEN_TYPE;
  data: string;
}

// 删除token
export interface removeTokenAction {
  type: REMOVE_TOKEN_TYPE;
}

// 获取用户信息
export interface userInfoAction {
  type: USER_INFO_TYPE;
  data: IuserInfo;
}

export type ModifyActions =
  | modifyTokenAction
  | removeTokenAction
  | userInfoAction;
