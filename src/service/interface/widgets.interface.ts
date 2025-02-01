export interface IWidget {
  name: string;
  url: string;
  id: number;
  createTime: string;
  type: elementsType;
  count: number;
  x: number;
  y: number;
  column: number;
  row: number;
  offsetX?: number;
  offsetY?: number;
}

// 用户信息结果
export interface IWidgetsResult {
  // 结果
  result: boolean;
  // 后台返回的token
  data: IWidget[];
  message: string;
}
