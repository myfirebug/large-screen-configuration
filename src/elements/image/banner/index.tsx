import React, { memo, useMemo } from "react";
import CustomSwiper from "@src/compoents/swiper";
import "./index.scss";
import { getStyles } from "@src/utils";
interface IBaseBanner {
  data: any;
  field: string;
  options: any;
}
export const BaseBanner = memo((option: IBaseBanner) => {
  const { data, field, options } = option;
  const baseTextStyle = useMemo(() => {
    return getStyles(options);
  }, [options]);
  return (
    <div className="cms-banner" style={baseTextStyle}>
      <CustomSwiper
        loop={options.loop || false}
        autoplay={options.autoplay || false}
        datas={data[field] || []}
        rows={options.rows || 1}
        slidesPerView={options.slidesPerView || 1}
        spaceBetween={options.spaceBetween || 0}
        pagination={options.pagination || false}
        navigation={options.navigation || false}
        render={(item) => {
          return (
            <img src={item.src} alt={item.name} width="100%" height="100%" />
          );
        }}
      />
    </div>
  );
});
