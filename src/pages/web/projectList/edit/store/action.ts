import { IProject } from "@src/service";
import { PROJECT_TYPE } from "./type";

// 获取项目
export interface projectAction {
  type: PROJECT_TYPE;
  data: IProject;
}

export type ModifyActions = projectAction;
