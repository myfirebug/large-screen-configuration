import Mock, { Random } from "mockjs";
export const userInfo = {
  url: "/elements",
  method: "get",
  data: {
    result: true,
    data: Mock.mock({
      data: [
        {
          "id|+1": 1,
          name: "基础文本框",
          url: Random.dataImage("200x100", "elements"),
          element: "baseText",
          type: "text",
          createTime: Random.now(),
          "count|1-100": 1000,
        },
      ],
    }),
    message: "获取组建列表成功",
  },
};
