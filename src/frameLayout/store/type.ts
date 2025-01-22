// 修改token
export const MODIFY_TOKEN = "MODIFY_TOKEN";
export type MODIFY_TOKEN_TYPE = typeof MODIFY_TOKEN;
// 删除token
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export type REMOVE_TOKEN_TYPE = typeof REMOVE_TOKEN;

export interface ALL_STATE {
  token: string;
}
