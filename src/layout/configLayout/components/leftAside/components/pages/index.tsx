import React, { FC, useEffect } from "react";
import { web } from "@src/core/hook";
import { Empty, Image } from "antd";
import "./index.scss";
import { IPage } from "@src/service";
interface IConfigLayoutLeftAsideWidget {
  onClick: (item: IPage) => void;
}

export const ConfigLayoutLeftAsidePage: FC<IConfigLayoutLeftAsideWidget> = ({
  onClick,
}) => {
  const { getPages, pagesList, pagesLoading } = web();
  useEffect(() => {
    getPages();
  }, [getPages]);
  return (
    <div className="cms-config-layout__pages">
      <div className="cms-config-layout__pages--right">
        {pagesList?.map((item) => (
          <div
            className="cms-config-layout__pages--item"
            key={item.pageId}
            onClick={() => onClick(item)}
          >
            <Image width={220} src={item.url} preview={false} />
            <div className="name">{item.name}</div>
          </div>
        ))}
        {!pagesLoading && !pagesList?.length && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  );
};
