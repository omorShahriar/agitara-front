"use client";

import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { getStrapiMedia } from "@/lib/media";
import { Navigation, Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { FadeInTopWrapper } from "../InViewAnimatedWrappers/Wrapper";

const Slider = ({ slides }) => {
  return (
    <FadeInTopWrapper>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        // autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={50}
      >
        {slides.map((slide) => {
          const { url } = getStrapiMedia(slide.image);
          return (
            <SwiperSlide key={slide.title}>
              <Link href={slide.url ? slide.url : "#"}>
                <div className=" mt-14 md:mt-2 relative  ">
                  <p className="md:text-3xl text-xl font-bold capitalize bg-gray-900/60 md:p-4 p-3 text-white absolute bottom-8 left-8 ">
                    {slide.title}
                  </p>
                  <Image
                    src={url}
                    width={1350}
                    height={760}
                    alt={slide.title}
                    className="rounded-md w-full max-h-[calc(100vh-172.65px-16px)]  object-fit object-center  "
                  />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </FadeInTopWrapper>
  );
};

export default Slider;
