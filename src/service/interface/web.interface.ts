import { IWidget } from "./widgets.interface";

export interface IPage {
  name: string;
  id: string;
  createTime: string;
  url: string;
  count: number;
  pageId: string;
  screenRatio: string;
  widgets: IWidget[];
  configuration: IAnyObject | null;
}

// 用户信息结果
export interface IPagesResult {
  // 结果
  result: boolean;
  data: IPage[];
  message: string;
}

export interface IProject {
  name: string;
  createTime: string;
  url: string;
  projectId: string;
  screenRatio: string;
  pages: IPage[];
  configuration: IAnyObject | null;
}

// 用户信息结果
export interface IProjectsResult {
  // 结果
  result: boolean;
  data: IProject[];
  message: string;
}
