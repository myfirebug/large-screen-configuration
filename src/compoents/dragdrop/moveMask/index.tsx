import React, { FC, HtmlHTMLAttributes, ReactNode, useMemo } from "react";
import { getItemSizeStyle } from "../drag";
import "./index.scss";

interface IMoveMask extends HtmlHTMLAttributes<HTMLDivElement> {
  /** 容器格子宽 */
  width: number;
  /** 容器格子高 */
  height: number;
  /** 格子间隔 */
  gap: number;
  /** 拖拽元素列数 */
  column: number;
  /** 拖拽元素行数 */
  row: number;
  /** 拖拽元素 x 坐标 */
  x: number;
  /** 拖拽元素 y 坐标 */
  y: number;
  children: ReactNode;
}

const MoveMask: FC<IMoveMask> = ({
  width = 0,
  height = 0,
  gap = 0,
  column = 0,
  row = 0,
  x = 0,
  y = 0,
  style,
  children,
}) => {
  // 获取遮罩层样式
  const maskStyle = useMemo(() => {
    return getItemSizeStyle(width, height, x, y, gap, column, row);
  }, [column, gap, height, row, width, x, y]);
  return (
    <div className="cms-drag__moveMask" style={{ ...maskStyle, ...style }}>
      {children}
    </div>
  );
};

export default MoveMask;
