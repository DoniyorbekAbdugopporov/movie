import React, { memo } from "react";
import MovieItem from "./MovieItem";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "../carousel/Swiper.css";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Movies = ({ data ,isDetail}) => {
  console.log(data);
  return (
    <div>
      <div className=" relative flex gap-2 justify-center flex-wrap container">
        {isDetail ? (
          <h3 className="text-white text-xl absolute left-7 -top-10">
            На неделе
          </h3>
        ) : (
          ""
        )}
        {isDetail ? (
          <Link to={"/"} className="text-primary text-lg absolute right-7 -top-10">
            {"Показать все >"}
          </Link>
        ) : (
          ""
        )}
        <Swiper
          loop={true}
          navigation={true}
          spaceBetween={10}
          slidesPerView={5}
          modules={[Navigation]}
          className="CardSwiper"
        >
          {data.results?.map((item, index) => (
            <SwiperSlide key={index} className="rounded-xl">
              <MovieItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default memo(Movies);
