import { IProject } from "@src/service";
import { PROJECT_TYPE, MODIFY_PROJECT_TYPE } from "./type";

// 获取项目
export interface projectAction {
  type: PROJECT_TYPE;
  data: IProject;
}
// 修改项目
export interface modifyProjectAction {
  type: MODIFY_PROJECT_TYPE;
  data: IAnyObject;
}

export type ModifyActions = projectAction | modifyProjectAction;
