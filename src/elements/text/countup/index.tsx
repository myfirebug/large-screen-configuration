import { getStyles } from "@src/utils";
import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import "./index.scss";
interface ICountup {
  data: any;
  field: string;
  options: any;
}

export const CountUp: FC<ICountup> = ({ data, field, options }) => {
  const countupRef = useRef<HTMLDivElement>(null);
  const countUpAnimRef = useRef<any>(null);

  const style = useMemo(() => {
    return getStyles(options);
  }, [options]);

  const countUpTextStyle = useMemo(() => {
    return getStyles(options, "countUpStyle");
  }, [options]);

  const addonBeforeTextStyle = useMemo(() => {
    return getStyles(options, "addonBeforeStyle");
  }, [options]);

  const addonAfterTextStyle = useMemo(() => {
    return getStyles(options, "addonAfterStyle");
  }, [options]);

  const initCountUp = useCallback(async () => {
    const countUpModule = await import("countup.js");
    countUpAnimRef.current = new countUpModule.CountUp(
      countupRef.current as HTMLDivElement,
      data[field],
      {
        decimalPlaces: 2,
      }
    );
    if (!countUpAnimRef.current.error) {
      countUpAnimRef.current.start();
    } else {
      console.error(countUpAnimRef.current.error);
    }
  }, [data, field]);
  useEffect(() => {
    initCountUp();
    return () => {
      countUpAnimRef.current = null;
    };
  }, [initCountUp]);
  return (
    <div className="cms-countUp" style={style}>
      {options.addonBefore && (
        <div className="cms-countUp__before" style={addonBeforeTextStyle}>
          {options.addonBefore}
        </div>
      )}
      <div
        className="cms-countUp__content"
        ref={countupRef}
        style={countUpTextStyle}
      ></div>
      {options.addonAfter && (
        <div className="cms-countUp__aftter" style={addonAfterTextStyle}>
          {options.addonAfter}
        </div>
      )}
    </div>
  );
};
