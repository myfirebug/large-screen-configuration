export interface IElement {
  name: string;
  url: string;
  id: number;
  createTime: string;
  type: elementsType;
  count: number;
  element: elementsNameType;
  x: number;
  y: number;
  column: number;
  row: number;
  offsetX?: number;
  offsetY?: number;
}

// 用户信息结果
export interface IElementsResult {
  // 结果
  result: boolean;
  // 后台返回的token
  data: IElement[];
  message: string;
}
