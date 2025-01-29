import { elements } from "../api";
import { IElement, IElementsResult } from "../interface";
import axios from "../fetch";

const elementsService = {
  // 用户信息
  elements(params: any) {
    return axios.get<IElement[], IElementsResult>(elements.list, params);
  },
};

export default elementsService;
