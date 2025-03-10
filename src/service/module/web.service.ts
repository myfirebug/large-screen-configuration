import { web } from "../api";
import { IPage, IPagesResult, IProject, IProjectsResult } from "../interface";
import axios from "../fetch";

const webService = {
  pages(params?: any) {
    return axios.get<IPage[], IPagesResult>(web.pageList, params);
  },
  projects(params?: any) {
    return axios.get<IProject[], IProjectsResult>(web.projectList, params);
  },
};

export default webService;
