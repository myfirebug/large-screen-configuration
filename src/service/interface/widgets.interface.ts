import { IElement } from "./elements.interface";

export interface IWidget {
  name: string;
  url: string;
  id: string;
  createTime: string;
  type: elementsType;
  count: number;
  widgetId?: string;
  x: number;
  y: number;
  column: number;
  row: number;
  configuration: IAnyObject | null;
  header: IElement[];
  body: IElement[];
}

// 用户信息结果
export interface IWidgetsResult {
  // 结果
  result: boolean;
  // 后台返回的token
  data: IWidget[];
  message: string;
}
