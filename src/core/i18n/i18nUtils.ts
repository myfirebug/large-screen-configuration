const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;

export function parse(format: string) {
  const tokens = [];
  let position = 0;

  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === "[" || char === "{") {
      if (text) {
        tokens.push({ type: "text", value: text });
      }

      text = "";
      let sub = "";
      char = format[position++];
      while (char !== undefined && char !== "]" && char !== "}") {
        sub += char;
        char = format[position++];
      }

      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : "unknown";
      tokens.push({ value: sub, type: type });
    } else {
      text += char;
    }
  }

  text && tokens.push({ type: "text", value: text });

  return tokens;
}

export function compile(tokens: any[], values: any[]) {
  const compiled: any[] = [];
  let index = 0;

  const mode = Array.isArray(values) ? "list" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }

  while (index < tokens.length) {
    const token = tokens[index];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "unknown":
        break;
    }
    index++;
  }

  return compiled;
}

// 函数方式
// export function useI18nFn() {
//   const $t = (keys: string | string[], args?: any[]) => {
//     if (typeof keys === "string") {
//       keys = [keys];
//     }
//     // 防止初始化页面显示表达式
//     const langConfig = store.langConfig || en;

//     let str = keys?.map(key => langConfig?.[key] || `${key}`).join("");

//     if (args) {
//       str = compile(parse(str), args).join("");

//       // for (const i of args) {
//       //   str = str.replace(/\[[\d]\]/, i + "");
//       // }
//     }
//     return str;
//   };

//   return { $t };
// }
