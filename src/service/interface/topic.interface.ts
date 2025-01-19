// tab 类型
export enum ITab {
  ask,
  share,
  job,
  good,
}

// 主题活动
export interface ITopicItem {
  // 键值
  id: string;
  // 作者ID
  author_id: string;
  // 类型
  tab: ITab;
  // 主题类型
  content: string;
  // 主题标题
  title: string;
  // 最后评论时间
  last_reply_at: string;
  //
  good: boolean;
  // 置顶
  top: boolean;
  // 评论数
  reply_count: number;
  // 访问数
  visit_count: number;
  // 创建时间
  create_at: string;
  author: {
    // 登录名
    loginname: string;
    // 头像
    avatar_url: string;
  };
}
