import React, {
  HtmlHTMLAttributes,
  useCallback,
  useMemo,
  useState,
  memo,
} from "react";
import "./index.scss";
import { dragStore } from "../drag";
interface IPreviewItem extends HtmlHTMLAttributes<HTMLDivElement> {
  data: IAnyObject;
  onResizeStart?: () => void;
  onResizeing?: (e: React.DragEvent<HTMLDivElement>) => void;
  onResizeEnd?: () => void;
  groupName?: string;
  /**
   * @param id 刪除的数据ID
   * @returns
   */
  onCloseHander?: (id: string) => void;
}

const PreviewItem = memo(
  (props: IPreviewItem) => {
    const {
      data,
      style,
      groupName,
      onResizeStart,
      onResizeing,
      onResizeEnd,
      onCloseHander,
    } = props;
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
        dragStore.set(groupName as string, {
          ...data,
          pageX: e.pageX,
          pageY: e.pageY,
        });
        setTimeout(() => {
          setMoveing(true);
        }, 0);
        setResizeing(false);
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
      },
      [data, groupName, onResizeStart]
    );

    const onMouseMove = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        onResizeing?.(e);
      },
      [onResizeing]
    );

    const onMouseUp = useCallback(
      (e: any) => {
        onResizeEnd?.();
        e.target.style.width = "100%";
        e.target.style.height = "100%";
        setResizeing(false);
      },
      [onResizeEnd]
    );
    return (
      <div
        className="cms-drag__preview--item"
        style={{ ...previewStyles, ...style }}
        onDragStart={onDragStart}
        draggable
        onDragEnd={onDragEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <div
          className="close"
          onClick={(e) => {
            e.preventDefault();
            onCloseHander?.(data.elementId);
          }}
        ></div>
        <div className="resize"></div>
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

export default PreviewItem;
