import React, { FC, useMemo } from "react";

interface IAuxiliaryLine {
  gap: number;
  column: number;
  width: number;
  height: number;
  row: number;
  borderColor?: string;
}

const AuxiliaryLine: FC<IAuxiliaryLine> = ({
  gap,
  column,
  width,
  height,
  row,
  borderColor = "rgba(255, 255, 255, 0.2)",
}) => {
  const style = useMemo(() => {
    return {
      display: "grid",
      gap: `${gap}px`,
      gridTemplateColumns: `repeat(${column}, ${
        (width - (column + 1) * gap) / column
      }px)`,
      gridTemplateRows: `repeat(${row},  ${
        (height - (row + 1) * gap) / row
      }px)`,
      width: "100%",
      height: "100%",
      padding: `${gap}px`,
    };
  }, [column, gap, height, row, width]);
  return (
    <div className="cms-grid-layout__auxiliaryLine" style={style}>
      {new Array(column * row).fill(null).map((_, index) => (
        <div
          key={index}
          style={{
            borderColor: borderColor || "rgba(255, 255, 255, 0.2)",
          }}
        ></div>
      ))}
    </div>
  );
};

export default AuxiliaryLine;
