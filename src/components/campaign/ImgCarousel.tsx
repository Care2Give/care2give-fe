import Image from "next/image";
import React, { CSSProperties } from "react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImgCarouselProps {
  coverImagesURLs: string[];
}

function ImgCarousel({ coverImagesURLs }: ImgCarouselProps) {
  return (
    <div className="overflow-hidden w-screen md:w-[640px] md:rounded-3xl">
      <Swiper
        style={
          {
            "--swiper-pagination-color": "#FFFFFF",
            "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
            "--swiper-pagination-bullet-inactive-opacity": "0.7",
            "--swiper-pagination-bullet-size": "12px",
            "--swiper-pagination-bullet-inactive-size": "8px",
            "--swiper-pagination-bullet-horizontal-gap": "3px",
            "--swiper-navigation-color": "#FFFFFF",
            "--swiper-navigation-size": "20px",
          } as CSSProperties
        }
        modules={[Navigation, Pagination, Scrollbar]}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        cssMode
        className="w-full md:w-auto md:h-full"
      >
        {coverImagesURLs.map((url, i) => (
          <SwiperSlide key={`${url}_${i}`}>
            <Image
              className="object-cover"
              src={url}
              alt="campaign cover image"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImgCarousel;
