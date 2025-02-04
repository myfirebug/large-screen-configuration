export interface IElement {
  name: string;
  url: string;
  id: string;
  createTime: string;
  type: elementsType;
  count: number;
  element: elementsNameType;
  elementId?: string;
  x: number;
  y: number;
  column: number;
  row: number;
  configuration: IAnyObject;
}

// 用户信息结果
export interface IElementsResult {
  // 结果
  result: boolean;
  // 后台返回的token
  data: IElement[];
  message: string;
}
