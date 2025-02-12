// 页面类型
type PageType =
  | "element"
  | "widget"
  | "page"
  | "project"
  | "layer"
  | "linkage"
  | "data";
// 组件类型
type elementsType = "text" | "image" | "table" | "line" | "bar" | "pie";
// 组件名称类型
type elementsNameType = elementsType | "baseText";
// 配置名称类型
type codeNameType =
  | "baseText"
  | "baseLine"
  | "baseSmoothLine"
  | "baseAreaLine"
  | "stackedLine"
  | "stackedAreaLine"
  | "lengthwaysLine";
// 任意object类型
interface IAnyObject {
  [propName: string]: any;
}
