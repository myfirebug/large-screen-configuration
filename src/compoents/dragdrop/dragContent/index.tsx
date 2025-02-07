import React, {
  memo,
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
  onDropHandler?: (isAdd: boolean, data: IAnyObject) => void;

  onResizeEndHandler?: (data: IAnyObject) => void;
}

const DragContent = memo(
  (props: IDragContent) => {
    const {
      groupName,
      column,
      row,
      gap,
      mask = true,
      field = "id",
      onDropHandler,
      datas,
      onResizeEndHandler,
    } = props;
    // 目标元素
    const target = useRef<HTMLDivElement>(null);
    // 宽高
    const [clientRect, setClientRect] = useState({
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    });
    const [resizeEnd, setResizeEnd] = useState(false);
    // 拖拽中的元素
    const [current, setCuurent] = useState<IAnyObject>({});
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
    // 计算列数
    const getColumn = useCallback(
      (num: number) => Math.max(1, Math.ceil(num / (clientRect.width + gap))),
      [clientRect.width, gap]
    );
    // 计算行数
    const getRow = useCallback(
      (num: number) => Math.max(1, Math.ceil(num / (clientRect.height + gap))),
      [clientRect.height, gap]
    );
    // 进入放置目标
    const onDragEnter = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dragData = dragStore.get(groupName as string);
        if (dragData) {
          setCuurent((state) => ({
            ...state,
            ...dragData,
            x: getX(e.pageX),
            y: getY(e.pageY),
            show: true,
          }));
        }
        console.log("onDragEnter");
      },
      [getX, getY, groupName]
    );
    // 在目标中移动
    const onDragOver = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log(e);
        const dragData = dragStore.get(groupName as string);
        if (dragData) {
          setCuurent((state) => ({
            ...state,
            ...dragData,
            x: getX(e.pageX),
            y: getY(e.pageY),
            show: true,
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
        console.log("onDragLeave");
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
          onDropHandler &&
            onDropHandler(!Boolean(dragData && dragData[field]), {
              ...dragData,
              ...current,
              [field]: dragData && dragData[field] ? dragData[field] : guid(),
            });
        }
        console.log("onDrop");
      },
      [current, field, groupName, isPutDown, onDropHandler]
    );
    // 调整大小开始
    const onResizeStart = useCallback(() => {
      const dragData = dragStore.get(groupName as string);
      if (dragData) {
        setResizeEnd(false);
        setCuurent((state) => ({
          ...state,
          ...dragData,
          show: true,
        }));
      }
    }, [groupName]);
    // 调正大小时
    const onResizeing = useCallback(
      (e: any) => {
        setResizeEnd(false);
        setCuurent((state) => ({
          ...state,
          column: getColumn(e.target.offsetWidth),
          row: getRow(e.target.offsetHeight),
        }));
      },
      [getColumn, getRow]
    );
    // 调整大小结束
    const onResizeEnd = useCallback(() => {
      setResizeEnd(true);
      setCuurent((state) => ({
        ...state,
        show: false,
      }));
    }, []);

    useEffect(() => {
      const dragData = dragStore.get(groupName as string);
      if (resizeEnd && isPutDown) {
        if (
          dragData?.column !== current.column ||
          dragData?.row !== current.row
        ) {
          onResizeEndHandler?.(current);
        }
      }
    }, [onResizeEndHandler, current, groupName, resizeEnd, isPutDown]);

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
                  current.show && item[field] !== current[field]
                    ? "none"
                    : "all",
              }}
              onResizeStart={onResizeStart}
              onResizeing={onResizeing}
              onResizeEnd={onResizeEnd}
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
  },
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
      return true;
    }
    return false;
  }
);

export default DragContent;
