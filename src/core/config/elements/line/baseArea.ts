import lineConfig from "./line";

export const baseAreaLine = {
  code: "baseAreaLine",
  ...lineConfig,
  configureValue: {
    ...lineConfig.configureValue,
    lineAreaStyle: true,
  },
};
