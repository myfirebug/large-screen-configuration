class DragStore<T extends IAnyObject> {
  moveItem = new Map<string, IAnyObject>();

  set(key: string, data: T) {
    this.moveItem.set(key, data);
    console.log(data);
  }

  remove(key: string) {
    this.moveItem.delete(key);
  }

  get(key: string): undefined | IAnyObject {
    return this.moveItem.get(key);
  }
}

/**
 * 拖拽临时数据
 */
export const dragStore = new DragStore<IAnyObject>();

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
