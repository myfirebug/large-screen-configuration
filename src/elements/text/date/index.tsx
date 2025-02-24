import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { fmtDate, getStyles } from "@src/utils";

interface IDateText {
  options: IAnyObject;
}

export const DateText: FC<IDateText> = ({ options }) => {
  const timer = useRef<any>(null);
  // 初始化时间
  const [text, setText] = useState(() => {
    return fmtDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");
  });
  // 获取时间
  const getText = useCallback(() => {
    setText(
      fmtDate(new Date().getTime(), options.fmtDate || "yyyy-MM-dd hh:mm:ss")
    );
  }, [options.fmtDate]);

  useEffect(() => {
    timer.current = setInterval(getText, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [timer, getText]);
  return <div style={getStyles(options)}>{text}</div>;
};
