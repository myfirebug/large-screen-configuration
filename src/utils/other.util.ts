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
    textShadow: `${config[prefix + `TextShadowX`] || 0}px ${
      config[prefix + `TextShadowY`] || 0
    }px ${config[prefix + `TextShadowF`] || 0}px ${
      config[prefix + `TextShadowC`]
    }`,
    boxShadow: `${config[prefix + `BoxShadowX`] || 0}px ${
      config[prefix + `BoxShadowY`] || 0
    }px ${config[prefix + `BoxShadowF`] || 0}px ${
      config[prefix + `BoxShadowC`] || 0
    } ${config[prefix + `BoxInset`] ? "inset" : ""}`,
  };

  for (let filed in config) {
    if (filed.indexOf(prefix) === 0 && typeof config[filed] !== "object") {
      let newField = filed.substring(prefix.length);
      newField = newField.replace(newField[0], newField[0].toLocaleLowerCase());
      if (!config[filed]) {
        continue;
      }
      switch (newField) {
        case "borderBottomColor": {
          result.borderBottom =
            `1px solid ` + config[`${prefix}BorderBottomColor`];
          break;
        }
        case "animateInfinite": {
          result.animationIterationCount = config[`${prefix}AnimateInfinite`]
            ? "infinite"
            : 1;
          break;
        }
        case "backgroundImage": {
          result[newField] = `url(${config[filed]})`;
          result.backgroundRepeat = "no-repeat";
          result.backgroundSize = "100% 100%";
          break;
        }
        case "height": {
          result.height = `${config[filed]}px`;
          break;
        }
        case "width": {
          result.width = `${config[filed]}px`;
          break;
        }
        case "lineHeight": {
          result.lineHeight = `${config[filed]}px`;
          break;
        }
        case "animationDelay": {
          result.animationDelay = config[prefix + `AnimationDelay`] + "s";
          break;
        }
        case "animationDuration": {
          result.animationDuration = config[prefix + `AnimationDuration`] + "s";
          break;
        }
        default: {
          result[newField] = config[filed];
        }
      }
    }
  }

  return result;
};

/**
 * 得到新的json数据集合
 * @param styles json数据集合
 * @param prefix 前缀
 * @returns 新的数据集合
 */
export const getPrefixStyle = (
  styles: IAnyObject,
  prefix: string = "style"
) => {
  let data: IAnyObject = {};
  for (let filed in styles) {
    if (filed.indexOf(prefix) === 0) {
      let newField = filed.substring(prefix.length);
      newField = newField.replace(newField[0], newField[0].toLocaleLowerCase());
      data[newField] = styles[filed];
    }
  }
  return data;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.replace(/^\w/, (c) => c.toUpperCase());
};

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};
