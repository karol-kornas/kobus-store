"use client";

import { useState, useRef } from "react";
import { ImageWithSkeleton } from "@/components/ui/imageWithSkeleton/ImageWithSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

type ProductImage = {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Props = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4" aria-label={`Galeria zdjęć produktu ${productName}`}>
      {/* Main slider */}
      <div className="relative w-full">
        <Swiper
          style={
            {
              "--swiper-pagination-color": "var(--foreground)",
              "--swiper-pagination-bullet-inactive-color": "var(--foreground)",
              "--swiper-pagination-bullet-width": "0.75rem",
              "--swiper-pagination-bullet-height": "0.75rem",
              "--swiper-pagination-bottom": "2rem",
            } as React.CSSProperties
          }
          modules={[Pagination, A11y, Keyboard]}
          keyboard={{ enabled: true }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          autoHeight
          onInit={(swiper) => (mainSwiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full"
          aria-live="polite"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image.id}-${index}`}>
              <ImageWithSkeleton
                src={image.src}
                alt={image.alt || `${productName} - zdjęcie ${index + 1}`}
                width={image.width ?? 660}
                height={image.height ?? 660}
                className="w-full h-auto object-contain"
                sizes="(min-width: 1024px) 660px, 100vw"
              />
            </SwiperSlide>
          ))}

          {/* Pagination tylko na mobile */}
          <div className="swiper-pagination static! w-full! lg:hidden flex justify-center mt-4"></div>
        </Swiper>
      </div>

      {/* Thumbnails – grid (tylko desktop) */}
      {images.length > 1 && (
        <div className="hidden lg:grid grid-cols-4 gap-2">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${image.id}-thumb-${index}`}
                type="button"
                aria-label={`Pokaż zdjęcie ${index + 1}`}
                aria-current={isActive}
                onClick={() => mainSwiperRef.current?.slideTo(index)}
                className={`relative aspect-square overflow-hidden border cursor-pointer
                  ${isActive ? "border-black" : "border-transparent"}
                  hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                <ImageWithSkeleton
                  src={image.src}
                  alt={image.alt || productName}
                  fill
                  className="object-cover"
                  wrapClassName="aspect-square overflow-hidden"
                  sizes="160px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
