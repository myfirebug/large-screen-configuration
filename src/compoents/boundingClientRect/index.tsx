import { useDebounce } from "ahooks";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface IResizeObserver {
  render: (width: number, height: number) => ReactNode;
}

const BoundingClientRect: FC<IResizeObserver> = ({ render }) => {
  const [boundingClientRect, setBoundingClientRect] = useState({
    width: 0,
    height: 0,
  });

  const debouncedValue = useDebounce(boundingClientRect, {
    wait: 50,
    trailing: true,
  });

  // 目标元素
  const target = useRef<HTMLDivElement>(null);

  // 动态计算目标元素的宽高
  const getClientRect = useCallback(() => {
    if (!target.current) return;
    const { width, height } = (
      target.current as HTMLDivElement
    )?.getBoundingClientRect();

    setBoundingClientRect({
      width,
      height,
    });
  }, []);
  useEffect(() => {
    getClientRect();
    const resizeObserver = new ResizeObserver((entries: string | any[]) => {
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
    <div ref={target} style={{ width: "100%", height: "100%" }}>
      {render(debouncedValue.width, debouncedValue.height)}
    </div>
  );
};

export default BoundingClientRect;
