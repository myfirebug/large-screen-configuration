class DragStore<T extends IAnyObject> {
  moveItem = new Map<string, T>();

  set(key: string, data: T) {
    this.moveItem.set(key, data);
  }

  remove(key: string) {
    this.moveItem.delete(key);
  }

  get(key: string): undefined | T {
    return this.moveItem.get(key);
  }
}

/**
 * 拖拽临时数据
 */
export const dragStore = new DragStore<IAnyObject>();

/**
 * 判断是否在当前四边形内
 * @param {*} p1 父容器
 * @param {*} p2
 * @returns
 *  对应是 左上角坐标 和 右下角坐标
 *  [0,0,1,1]  => 左上角坐标 0,0  右下角 1,1
 */
export const booleanWithin = (
  p1: [number, number, number, number],
  p2: [number, number, number, number]
) => {
  return p1[0] <= p2[0] && p1[1] <= p2[1] && p1[2] >= p2[2] && p1[3] >= p2[3];
};

/**
 * 判断是两四边形是否相交
 * @param {*} p1 父容器
 * @param {*} p2
 * @returns
 *  对应是 左上角坐标 和 右下角坐标
 *  [0,0,1,1]  => 左上角坐标 0,0  右下角 1,1
 */
export const booleanIntersects = (
  p1: [number, number, number, number],
  p2: [number, number, number, number]
) => {
  return !(
    p1[2] <= p2[0] || // p1 在 p2 左边
    p2[2] <= p1[0] || // p1 在 p2 右边
    p1[3] <= p2[1] || // p1 在 p2 上边
    // p1 在 p2 下边
    p2[3] <= p1[1]
  );
};

/**
 * 获取元素位置信息
 * @param {*} width 格子宽
 * @param {*} height 格子高
 * @param {*} x x 坐标
 * @param {*} y y 坐标
 * @param {*} gap 间隔
 * @param {*} column 元素占列数
 * @param {*} row 元素占行数
 * @returns
 */
export const getItemSizeStyle = (
  width: number,
  height: number,
  x: number,
  y: number,
  gap: number,
  column: number,
  row: number
) => {
  return {
    width: `${width * column + (column - 1) * gap}px`,
    height: `${height * row + (row - 1) * gap}px`,
    transform: `translate(${(width + gap) * (x - 1)}px,${
      (height + gap) * (y - 1)
    }px)`,
  };
};
