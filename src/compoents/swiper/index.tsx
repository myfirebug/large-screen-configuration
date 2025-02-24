import React, { FC, ReactNode, useEffect, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.scss";
import { SwiperModule } from "swiper/types";
interface ICustomSwiper {
  direction?: "vertical" | "horizontal";
  datas?: IAnyObject[];
  loop?: boolean;
  spaceBetween?: number;
  slidesPerView?: number;
  rows?: number;
  pagination?: boolean;
  navigation?: boolean;
  autoplay?: boolean;
  render?: (item: IAnyObject) => ReactNode;
}
export const CustomSwiper: FC<ICustomSwiper> = ({
  loop = false,
  spaceBetween = 0,
  slidesPerView = 1,
  rows = 1,
  pagination = false,
  navigation = false,
  autoplay = false,
  datas = [],
  direction = "horizontal",
  render,
}) => {
  const modules = useMemo(() => {
    let arr: SwiperModule[] = [];
    autoplay && arr.push(Autoplay);
    pagination && arr.push(Pagination);
    navigation && arr.push(Navigation);
    return arr;
  }, [autoplay, navigation, pagination]);

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (autoplay) {
      swiperRef.current?.swiper?.autoplay?.start();
    } else {
      swiperRef.current?.swiper?.autoplay?.stop();
    }
  }, [autoplay]);
  return (
    <div className="cms-swiper">
      <Swiper
        ref={swiperRef}
        loop={loop}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        modules={modules}
        navigation={navigation}
        pagination={pagination}
        direction={direction}
      >
        {new Array(Math.ceil(datas.length / rows))
          .fill(null)
          .map((_, index) => (
            <SwiperSlide key={index}>
              {new Array(rows).fill(null).map((_, subIndex) => (
                <div
                  style={{
                    height: `${100 / rows}%`,
                    marginTop: subIndex ? `${spaceBetween}px` : 0,
                  }}
                  key={subIndex}
                >
                  {render &&
                    index * rows + subIndex < datas.length &&
                    render(datas?.[index * rows + subIndex])}
                </div>
              ))}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
