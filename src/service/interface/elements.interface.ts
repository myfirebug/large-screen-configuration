export interface IElement {
  name: string;
  url: string;
  id: string;
  createTime: string;
  // 类型
  type: elementsType;
  // 所使用的组件即src/elements下导出的组件名称
  element: elementsNameType;
  // 配置名称既src/core/config/elements下导出的名称
  code: codeNameType;
  count: number;
  elementId?: string;
  x: number;
  y: number;
  column: number;
  row: number;
  configuration: IAnyObject;
  position?: "header" | "body";
}

// 用户信息结果
export interface IElementsResult {
  // 结果
  result: boolean;
  // 后台返回的token
  data: IElement[];
  message: string;
}
