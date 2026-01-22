"use client";

import { useState, useRef } from "react";
import { ImageWithSkeleton } from "@/components/ui/imageWithSkeleton/ImageWithSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { ProductImage } from "@/types/productImage";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";

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
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image.id}-${index}`} className="text-center">
              <SmartImage
                src={image.src}
                srcSet={image.srcset}
                width={image.width ?? 660}
                height={image.height ?? 660}
                sizes="(min-width: 1024px) 660px, 94vw"
                alt={image.alt || `${productName} - zdjęcie ${index + 1}`}
                wrapClassName="inline-flex"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </SwiperSlide>
          ))}

          <div className="swiper-pagination static! w-full! lg:hidden flex justify-center mt-4"></div>
        </Swiper>
      </div>

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
                className={`relative overflow-hidden border cursor-pointer
                  ${isActive ? "border-black" : "border-transparent"}
                  hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                <SmartImage
                  src={image.src}
                  srcSet={image.srcset}
                  alt={image.alt || productName}
                  sizes="160px"
                  wrapClassName="aspect-3/4 w-full overflow-hidden"
                  className="absolute inset-0 size-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
