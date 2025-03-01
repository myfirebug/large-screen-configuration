import Mock from "mockjs";

export const widgets = {
  url: "/pageList",
  method: "get",
  data: {
    result: true,
    data: [
      {
        name: "空气环境质量页面模版",
        id: Mock.mock("@guid"),
        createTime: Mock.mock('@date("yyyy-MM-dd")'),
        count: Mock.mock('@string("number", 5)'),
        pageId: Mock.mock("@guid"),
        screenRatio: "4*4",
        widgets: [],
      },
    ],
    message: "获取组建列表成功",
  },
};
