import React, { createContext, useEffect, useState } from "react";
import locales, { Locale } from "./locales";
import { localStorage } from "@src/utils";
import { CURRENT_LOCALS, LOCAL_NAME } from "../enums/access.enums";
import { compile, parse } from "./i18nUtils";

export type LocaleContextType = {
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
  $t: (keys: string | string[], args?: any[]) => string;
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: "en_US",
  setLocale: () => {},
  $t: () => "",
});

type LocaleProviderProps = {
  locale?: Locale;
  children: React.ReactNode;
};

export const LocaleProvider = ({
  locale: propLocale = "zh_CN",
  children,
}: LocaleProviderProps) => {
  const [locale, setLocale] = useState<Locale>(propLocale);
  useEffect(() => {
    localStorage.set(LOCAL_NAME, locale || "zh_CN");
    localStorage.set(CURRENT_LOCALS, locales[locale] ?? locales.zh_CN);
  }, [locale]);

  const $t = (keys: string | string[], args?: any[]) => {
    if (typeof keys === "string") {
      keys = [keys];
    }
    // 防止初始化页面显示表达式
    const langConfig = locales[locale] || locales.zh_CN;

    let str = keys?.map((key) => langConfig?.[key] || `${key}`).join("");

    if (args) {
      str = compile(parse(str), args).join("");
    }
    return str;
  };
  return (
    <LocaleContext.Provider value={{ locale, setLocale, $t }}>
      {children}
    </LocaleContext.Provider>
  );
};
