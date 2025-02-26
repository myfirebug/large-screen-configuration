import React, { memo, useMemo } from "react";
import CustomSwiper from "@src/compoents/swiper";
import "./index.scss";
import { getStyles } from "@src/utils";
interface IBaseBanner {
  data: any;
  field: string;
  options: any;
}

const Table = memo((props: IBaseBanner) => {
  const { data, field, options } = props;
  const baseTextStyle = useMemo(() => {
    return getStyles(options);
  }, [options]);

  const datas = useMemo(() => {
    // 这里主要处理隔行换色
    if (
      data[field] &&
      data[field].length > options.slidesPerView &&
      data[field].length % 2 === 1
    ) {
      return [...data[field], ...data[field]];
    } else {
      return data[field];
    }
  }, [data, field, options.slidesPerView]);

  const renderItem = (data: any, components: string) => {
    switch (components) {
      case "progress": {
        return (
          <div
            className="cms-table__progress"
            style={{ background: options.progressBackgroundColor }}
          >
            <div
              style={{
                width: data,
                background: options.progressForegroundColor,
              }}
            ></div>
          </div>
        );
      }
      default: {
        return <>{data}</>;
      }
    }
  };

  return (
    <div className="cms-table" style={baseTextStyle}>
      <div
        className="cms-table__header"
        style={{
          background: options.tableHeaderBackgroudColor,
          color: options.tableHeaderColor,
          display: options.tableShowHeader ? "flex" : "none",
        }}
      >
        {options.tableColumn.map((item: any, index: number) => (
          <div
            key={index}
            className="cms-table__cell"
            style={{
              width: `${item.width}px`,
              flex: item.width ? "none" : 1,
              justifyContent: item.align === "right" ? "end" : "start",
            }}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div
        className="cms-table__body"
        style={{ color: options.tableTbodyColor }}
      >
        <CustomSwiper
          loop={options.loop || false}
          autoplay={options.autoplay || false}
          datas={datas}
          rows={options.rows || 1}
          slidesPerView={options.slidesPerView || 1}
          spaceBetween={options.spaceBetween || 0}
          direction="vertical"
          render={(item, index) => {
            return (
              <div
                key={index}
                className="cms-table__row"
                style={
                  (index as number) % 2 === 0
                    ? getStyles(options, "tableTbodyOdd")
                    : getStyles(options, "tableTbodyEven")
                }
              >
                {options.tableColumn.map((subItem: any, subIndex: number) => (
                  <div
                    key={subIndex}
                    className="cms-table__cell"
                    style={{
                      width: `${subItem.width}px`,
                      flex: subItem.width ? "none" : 1,
                      justifyContent:
                        subItem.align === "right" ? "end" : "start",
                    }}
                  >
                    {subItem.dataIndex === "index" ? (
                      <span
                        className={`cms-table__serialNumber ${
                          options.serialNumberRank ? "is-" + index : ""
                        }`}
                        style={getStyles(options, "serialNumber")}
                      >
                        {(index as number) + 1}
                      </span>
                    ) : (
                      renderItem(item[subItem.dataIndex], subItem.components)
                    )}
                  </div>
                ))}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
});

export default Table;
