import { widgets } from "../api";
import { IWidget, IWidgetsResult } from "../interface";
import axios from "../fetch";

const widgetsService = {
  // 用户信息
  widgets(params?: any) {
    return axios.get<IWidget[], IWidgetsResult>(widgets.list, params);
  },
};

export default widgetsService;
