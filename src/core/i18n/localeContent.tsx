import React, { createContext, useState } from "react";
import locales, { Locale } from "./locales";
import { localStorage } from "@src/utils";
import { CURRENT_LOCALS, LOCAL_NAME } from "../enums/access.enums";

export type LocaleContextType = {
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
};

export const LocaleContext = createContext<LocaleContextType | null>(null);

type LocaleProviderProps = {
  locale?: Locale;
  children: React.ReactNode;
};

export const LocaleProvider = ({
  locale: propLocale = "zh_CN",
  children,
}: LocaleProviderProps) => {
  const [locale, setLocale] = useState<Locale>(propLocale);

  localStorage.set(LOCAL_NAME, locale || "zh_CN");
  localStorage.set(CURRENT_LOCALS, locales[locale] ?? locales.zh_CN);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
