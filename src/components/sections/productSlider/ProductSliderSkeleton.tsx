"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ProductCardSkeleton } from "@/components/products/productCard/ProductCardSkeleton";

interface Props {
  productsLength: number;
}

export function ProductSliderSkeleton({ productsLength }: Props) {
  return (
    <>
      <Swiper
        className="mt-3"
        spaceBetween={24}
        slidesPerView={1.25}
        breakpoints={{
          640: {
            slidesPerView: 1.75,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {Array.from({ length: productsLength }).map((_, index) => (
          <SwiperSlide key={index}>
            <ProductCardSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
      <SliderPaginationSkeleton />
    </>
  );
}

export function SliderPaginationSkeleton() {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="h-3 w-3 rounded-full bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}
