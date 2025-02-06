import React, {
  FC,
  HtmlHTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from "react";
import "./index.scss";
import { dragStore } from "../drag";
interface IPreviewItem extends HtmlHTMLAttributes<HTMLDivElement> {
  data: IAnyObject;
  onResizeStart?: () => void;
  onResizeing?: (e: React.DragEvent<HTMLDivElement>) => void;
  onResizeEnd?: () => void;
  groupName?: string;
}

const PreviewItem: FC<IPreviewItem> = ({
  data,
  style,
  groupName,
  onResizeStart,
  onResizeing,
  onResizeEnd,
}) => {
  const [moveing, setMoveing] = useState(false);
  const [resizeing, setResizeing] = useState(false);
  const previewStyles = useMemo(() => {
    return {
      gridArea: `${data.y} / ${data.x} / ${data.y + data.row}/ ${
        data.x + data.column
      }`,
      ...(moveing
        ? {
            opacity: 0,
            // 将当前元素移出容器外,将元素占位空置出来
            transform: `translate(-999999999px, -9999999999px)`,
          }
        : {}),
      ...(resizeing ? { opacity: 0.5 } : {}),
    };
  }, [data.column, data.row, data.x, data.y, moveing, resizeing]);
  // 移动开始
  const onDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      dragStore.set(groupName as string, data);
      setTimeout(() => {
        setMoveing(true);
      }, 0);
      unset(e.target);
    },
    [data, groupName]
  );
  // 移动结束
  const onDragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      setMoveing(false);
      dragStore.remove(groupName as string);
    },
    [groupName]
  );

  const onMouseDown = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      dragStore.set(groupName as string, data);
      setResizeing(true);
      onResizeStart?.();

      e.target.addEventListener("mousemove", (event) => {
        onResizeing?.(e);
      });
      e.target.addEventListener("mouseup", (event: any) => {
        unset(event.target);
        onResizeEnd?.();
        event.target.style.width = "100%";
        event.target.style.height = "100%";
        dragStore.remove(groupName as string);
      });
    },
    [data, groupName, onResizeEnd, onResizeStart, onResizeing]
  );

  const unset = (target: any) => {
    setResizeing(false);
    target.onmousemove = null;
    target.onmouseup = null;
  };
  return (
    <div
      className="cms-drag__preview--item"
      style={{ ...previewStyles, ...style }}
      onDragStart={onDragStart}
      draggable
      onDragEnd={onDragEnd}
      onMouseDown={onMouseDown}
    >
      <div className="close"></div>
      <div className="resize"></div>
    </div>
  );
};

export default PreviewItem;
