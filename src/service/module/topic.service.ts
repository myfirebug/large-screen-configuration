import { Topic } from "../api";
import { ITopicItem } from "../interface";
import axios from "../fetch";

const topicService = {
  // 主题首页
  getTopics(params: any) {
    return axios.get<ITopicItem[], ITopicItem[]>(Topic.getTopics, { params });
  },
};

export default topicService;
