import React, { CSSProperties, FC, ReactNode } from "react";
import Rule from "./components/rule";
import "./index.scss";
import { Slider, SliderSingleProps } from "antd";
interface IConfigLayoutMain {
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
  scale?: number;
  setScale?: React.Dispatch<React.SetStateAction<number>>;
}

export const ConfigLayoutMain: FC<IConfigLayoutMain> = ({
  children,
  style,
  id,
  scale,
  setScale,
}) => {
  const formatter: NonNullable<SliderSingleProps["tooltip"]>["formatter"] = (
    value
  ) => `${value}%`;
  return (
    <div className="cms-config-layout__main">
      <div className="cms-config-layout__body">
        <div className="cms-config-layout__center">
          <Rule />
          <div
            id={id}
            style={{
              ...style,
              transform: `scale(${scale ? scale / 100 : 1})`,
              transformOrigin: "0 0",
            }}
          >
            {children}
          </div>
        </div>
      </div>
      {scale && setScale ? (
        <div className="cms-config-layout__footer">
          <span>缩放比例：</span>
          <Slider
            tooltip={{ formatter, open: true }}
            style={{
              width: 300,
            }}
            min={50}
            max={100}
            defaultValue={scale}
            onChange={(value) => {
              console.log(value, "value");
              setScale(value);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
