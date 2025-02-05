import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./index.scss";
import { booleanIntersects, booleanWithin, dragStore } from "../drag";
import MoveMask from "../moveMask";
import { guid } from "@src/utils";
import PreviewItem from "../previewItem";

interface IDragContent {
  datas: IAnyObject[];
  /** 拖拽分组标识 */
  groupName?: string;
  /** 容器需要分隔列数 */
  column: number;
  /** 容器需要分隔行数 */
  row: number;
  /** 容器格子间隔 */
  gap: number;
  /** 是否显示拖拽预占位层 */
  mask?: boolean;
  /** drop时对比的id字段 */
  field?: string;
  /**
   * @param isAdd 是否新增
   * @param data 数据
   * @returns
   */
  ondrop?: (isAdd: boolean, data: IAnyObject) => void;
}

const DragContent: FC<IDragContent> = ({
  groupName,
  column,
  row,
  gap,
  mask = true,
  field = "id",
  ondrop,
  datas,
}) => {
  // 目标元素
  const target = useRef<HTMLDivElement>(null);
  // 宽高
  const [clientRect, setClientRect] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  // 拖拽中的元素
  const [current, setCuurent] = useState<IAnyObject>({
    x: 0,
    y: 0,
    column: 0,
    row: 0,
    show: false,
  });
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

  // 判断是否可放置
  const isPutDown = useMemo(() => {
    const currentXy: [number, number, number, number] = [
      current.x,
      current.y,
      current.x + current.column - 1,
      current.y + current.row - 1,
    ];
    return (
      booleanWithin([0, 0, column, row], currentXy) &&
      datas.every(
        (item) =>
          item[field] === current[field] ||
          !booleanIntersects(
            [item.x - 1, item.y - 1, item.x + item.column, item.y + item.row],
            currentXy
          )
      )
    );
  }, [column, current, datas, field, row]);

  // 计算 x 坐标
  const getX = useCallback(
    (num: number) =>
      parseInt(String((num - clientRect.x) / (clientRect.width + gap))) + 1,
    [clientRect.width, clientRect.x, gap]
  );
  // 计算 y 坐标
  const getY = useCallback(
    (num: number) =>
      parseInt(String((num - clientRect.y) / (clientRect.height + gap))) + 1,
    [clientRect.height, clientRect.y, gap]
  );

  // 进入放置目标
  const onDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const dragData = dragStore.get(groupName as string);
      if (dragData) {
        setCuurent((state) => {
          const data = {
            ...state,
            ...dragData,
            x: getX(e.pageX),
            y: getY(e.pageY),
            show: true,
          };
          return data;
        });
      }
      console.log("onDragEnter");
    },
    [getX, getY, groupName]
  );
  // 在目标中移动
  const onDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const dragData = dragStore.get(groupName as string);
      if (dragData) {
        setCuurent((state) => ({
          ...state,
          x: getX(e.pageX),
          y: getY(e.pageY),
        }));
      }
      console.log("onDragOver");
    },
    [getX, getY, groupName]
  );
  // 离开目标
  const onDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setCuurent((state) => ({
        ...state,
        show: false,
        [field]: undefined,
      }));
      console.log(e, "onDragLeave");
    },
    [field]
  );
  // 放置在目标上
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      const dragData = dragStore.get(groupName as string);
      e.preventDefault();
      setCuurent((state) => ({
        ...state,
        show: false,
      }));
      if (isPutDown) {
        ondrop &&
          ondrop(!Boolean(dragData && dragData[field]), {
            ...dragData,
            ...current,
            [field]: dragData && dragData[field] ? dragData[field] : guid(),
          });
      }
    },
    [current, field, groupName, isPutDown, ondrop]
  );

  return (
    <div
      ref={target}
      className="cms-drag__content"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div
        className="cms-drag__content--container"
        style={{
          display: "grid",
          gap: `${gap}px`,
          gridTemplateColumns: `repeat(${column}, ${clientRect.width}px)`,
          gridTemplateRows: `repeat(${row},  ${clientRect.height}px)`,
          width: "100%",
          height: "100%",
        }}
      >
        {new Array(column * row).fill(null).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
      <div
        className="cms-drag__preview"
        style={{
          display: "grid",
          gap: `${gap}px`,
          gridTemplateColumns: `repeat(${column}, ${clientRect.width}px)`,
          gridTemplateRows: `repeat(${row},  ${clientRect.height}px)`,
          width: "100%",
          height: "100%",
        }}
      >
        {datas.map((item) => (
          <PreviewItem
            key={item[field]}
            data={item}
            groupName={groupName}
            style={{
              pointerEvents:
                current.show && item[field] !== current[field] ? "none" : "all",
            }}
          ></PreviewItem>
        ))}

        {mask ? (
          <MoveMask
            style={{
              display: current?.show ? "flex" : "none",
              background: isPutDown
                ? "var(--cms-divider-color)"
                : "var(--cms-color-help)",
            }}
            width={clientRect.width}
            height={clientRect.height}
            gap={gap}
            column={current?.column}
            row={current?.row}
            x={current?.x}
            y={current?.y}
          >
            {isPutDown ? "可放置" : "不可放置"}
          </MoveMask>
        ) : null}
      </div>
    </div>
  );
};

export default DragContent;
