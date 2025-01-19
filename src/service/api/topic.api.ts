export class Topic {
  // 主题首页
  public static getTopics = "/topics";
  // 主题详情
  public static getTopic(id: string) {
    return `/topic/${id}`;
  }
  // 新建主题
  public static addTopics = "/topics";
  // 编辑主题
  public static updateTopics = "/topics/update";
  // 收藏主题
  public static topicCollect = "/topic_collect/collect";
  // 用户所收藏的主题
  public static topicCollectByLoginname(loginname: string) {
    return `/topic_collect/${loginname}`;
  }
  // 新建评论
  public static addReply(topicId: string) {
    return `/topic/${topicId}/replies`;
  }
  // 评论点赞
  public static replyUps(replyId: string) {
    return `/reply/${replyId}/ups`;
  }
}
