/**
 * 生成唯一ID
 * @returns {string}
 */
export function guid(): string {
  const s: any[] = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "=";

  const uuid = s.join("");
  return uuid;
}

/**
 * 设置样式
 * @param config json数据
 */
export const getStyles = (
  config: { [propName: string]: any },
  prefix: string = "style"
) => {
  let result: any = {
    width: config.width,
    height: config.height,
    animationIterationCount: config[`${prefix}AnimateInfinite`]
      ? "infinite"
      : 1,
    textShadow: `${config[prefix + `TextShadowX`]}px ${
      config[prefix + `TextShadowY`]
    }px ${config[prefix + `TextShadowF`]}px ${config[prefix + `TextShadowC`]}`,
    boxShadow: `${config[prefix + `BoxShadowX`]}px ${
      config[prefix + `BoxShadowY`]
    }px ${config[prefix + `BoxShadowF`]}px ${config[prefix + `BoxShadowC`]} ${
      config[prefix + `BoxInset`] ? "inset" : ""
    }`,
  };
  for (let filed in config) {
    if (filed.indexOf(prefix) === 0 && typeof config[filed] !== "object") {
      let newField = filed.substring(prefix.length);
      newField = newField.replace(newField[0], newField[0].toLocaleLowerCase());
      if (newField === "backgroundImage" && config[filed]) {
        result[newField] = `url(${config[filed]})`;
        result.backgroundRepeat = "no-repeat";
        result.backgroundSize = "100% 100%";
        continue;
      }
      if (newField === "height" && config[filed]) {
        result.height = `${config[filed]}px`;
        continue;
      }
      result[newField] = config[filed];
    }
  }
  result.animationDelay = config[prefix + `AnimationDelay`] + "s";
  result.animationDuration = config[prefix + `AnimationDuration`] + "s";
  return result;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.replace(/^\w/, (c) => c.toUpperCase());
};
