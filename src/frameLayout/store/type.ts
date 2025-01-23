import { IuserInfo } from "@src/service";

// 修改token
export const MODIFY_TOKEN = "MODIFY_TOKEN";
export type MODIFY_TOKEN_TYPE = typeof MODIFY_TOKEN;
// 删除token
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export type REMOVE_TOKEN_TYPE = typeof REMOVE_TOKEN;
// 用户信息
export const USER_INFO = "USER_INFO";
export type USER_INFO_TYPE = typeof USER_INFO;

export interface ALL_STATE {
  token: string;
  userInfo: IuserInfo | null;
}
