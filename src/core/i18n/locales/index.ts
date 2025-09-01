import en from "./en.json";
import zh_CN from "./zh_CN.json";

const locales = { en: en, zh_CN: zh_CN };
export type Locale = keyof typeof locales;
export default locales;
