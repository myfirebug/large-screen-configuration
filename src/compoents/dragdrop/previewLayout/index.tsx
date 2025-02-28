import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface IPreviewLayout {
  datas: IAnyObject;
  /** 列 */
  column: number;
  /** 行 */
  row: number;
  /** 间隔 */
  gap: number;
  render: (data: IAnyObject) => ReactNode;
}

const PreviewLayout: FC<IPreviewLayout> = ({
  gap,
  row,
  column,
  datas,
  render,
}) => {
  // 宽高
  const [clientRect, setClientRect] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  // 目标元素
  const target = useRef<HTMLDivElement>(null);

  // 动态计算目标元素的宽高
  const getClientRect = useCallback(() => {
    if (!target.current) return;
    const { width, height, x, y } = (
      target.current as HTMLDivElement
    )?.getBoundingClientRect();
    setClientRect({
      width: (width - (column - 1) * gap) / column,
      height: (height - (row - 1) * gap) / row,
      x: x,
      y: y,
    });
  }, [column, gap, row]);
  useEffect(() => {
    getClientRect();
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      getClientRect();
    });

    resizeObserver.observe(target.current as HTMLDivElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [getClientRect]);

  return (
    <div
      ref={target}
      style={{
        display: "grid",
        gap: `${gap}px`,
        gridTemplateColumns: `repeat(${column}, ${clientRect.width}px)`,
        gridTemplateRows: `repeat(${row},  ${clientRect.height}px)`,
        width: "100%",
        height: "100%",
      }}
    >
      {datas.map((item: IAnyObject, index: number) => (
        <div
          key={index}
          style={{
            gridArea: `${item.y} / ${item.x} / ${item.y + item.row}/ ${
              item.x + item.column
            }`,
          }}
        >
          {render(item)}
        </div>
      ))}
    </div>
  );
};

export default PreviewLayout;
