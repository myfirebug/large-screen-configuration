export type elementType = "baseText";

export interface IElement {
  name: string;
  url: string;
  id: number;
  createTime: string;
  type: string;
  count: number;
  element: string;
}

// 用户信息结果
export interface IElementsResult {
  // 结果
  result: boolean;
  // 后台返回的token
  data: IElement[];
  message: string;
}
