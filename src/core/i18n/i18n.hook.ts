import { CURRENT_LOCALS } from "../enums/access.enums";
import { compile, parse } from "./i18nUtils";
import { localStorage } from "@src/utils";
// 函数方式
export function useI18n() {
  const $t = (keys: string | string[], args?: any[]) => {
    if (typeof keys === "string") {
      keys = [keys];
    }
    // 防止初始化页面显示表达式
    const langConfig = localStorage.get(CURRENT_LOCALS);

    let str = keys?.map((key) => langConfig?.[key] || `${key}`).join("");

    if (args) {
      str = compile(parse(str), args).join("");
    }
    return str;
  };

  return { $t };
}
