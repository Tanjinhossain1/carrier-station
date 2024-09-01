"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Autoplay,Navigation } from "swiper/modules";

const BannerCarousel = () => {
  return (
    <div className="w-full md:max-w-[1200px] mx-auto " >
      <Swiper
        pagination={{
          clickable: true,
        }}
        loop={true} 
        autoplay={{
          delay: 1000, // Slide duration in milliseconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        navigation={{  enabled:true }} // Optional: Show navigation arrows
        modules={[Pagination, Autoplay,Navigation]}
        className="md:h-[400px]   w-full"
      >
        <SwiperSlide>
          <div className="relative h-full w-full">
            <Link href={"/"}>
              <Image
                src="/download.jpeg"
                alt="Banner 1"
                layout="responsive"
                width={100}
                height={100}
                // objectFit="contain"
                // objectPosition="center"
                quality={100}
                priority={true}
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <Link href={"/"}>
              <Image
                src="/download (1).jpeg"
                alt="Banner 2"
                layout="responsive"
                width={100}
                height={100}
                // objectFit="contain"
                // objectPosition="center"
                quality={100}
                priority={true}
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <Link href={"/"}>
              <Image
                src="/download (2).jpeg"
                alt="Banner 3"
                layout="responsive"
                width={100}
                height={100}
                // objectFit="contain"
                // objectPosition="center"
                quality={100}
                priority={true}
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <Link href={"/"}>
              <Image
                src="/download (3).jpeg"
                alt="Banner 4"
                layout="responsive"
                width={100}
                height={100}
                // objectFit="contain"
                // objectPosition="center"
                quality={100}
                priority={true}
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <Link href={"/"}>
              <Image
                src="/download (7).jpeg"
                alt="Banner 5"
                layout="responsive"
                width={100}
                height={100}
                // objectFit="contain"
                // objectPosition="center"
                quality={100}
                priority={true}
              />
            </Link>
          </div>
        </SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
