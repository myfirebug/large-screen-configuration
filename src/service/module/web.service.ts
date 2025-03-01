import { web } from "../api";
import { IPage, IPagesResult } from "../interface";
import axios from "../fetch";

const webService = {
  pages(params?: any) {
    return axios.get<IPage[], IPagesResult>(web.pageList, params);
  },
};

export default webService;
