import { IProject } from "@src/service";

// 获取项目
export const PROJECT = "PROJECT";
export type PROJECT_TYPE = typeof PROJECT;

// 修改项目
export const MODIFY_PROJECT = "MODIFY_PROJECT";
export type MODIFY_PROJECT_TYPE = typeof MODIFY_PROJECT;

export interface ALL_STATE {
  project: IProject;
  elementId: string | undefined;
  widgetId: string | undefined;
  pageId: string | undefined;
  projectId: string | undefined;
}
