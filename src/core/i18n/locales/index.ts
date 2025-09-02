import en_US from "./en_US.json";
import zh_CN from "./zh_CN.json";

const locales = { en_US, zh_CN };
export type Locale = keyof typeof locales;
export default locales;
