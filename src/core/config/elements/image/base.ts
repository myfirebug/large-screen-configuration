import { elementDataConfig, boxConfig } from "@src/core/config/base";

export const baseImage: IAnyObject = {
  code: "baseImage",
  // 配置项值
  configureValue: {
    styleDisplay: "block",
    ...boxConfig.configureValue,
  },
  // 数据值
  dataValue: {
    ...elementDataConfig.configureValue,
    mock: {
      value:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  },
};
