import React, { FC } from "react";

interface IMask {}

export const Mask: FC<IMask> = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        background: "rgba(255,255,255,0.5)",
      }}
    ></div>
  );
};
