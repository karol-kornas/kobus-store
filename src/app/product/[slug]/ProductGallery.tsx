"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type ProductImage = {
  id: number;
  src: string;
  alt: string;
};

type Props = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4" aria-label={`Galeria zdjęć produktu ${productName}`}>
      {/* Main slider */}
      <div className="relative w-full">
        <Swiper
          modules={[Navigation, Thumbs, A11y, Keyboard]}
          keyboard={{ enabled: true }}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          autoHeight
          onInit={(swiper) => (mainSwiperRef.current = swiper)}
          className="w-full"
          aria-live="polite"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image.id}-${index}`} className="">
              <div className="relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt || `${productName} – zdjęcie ${index + 1}`}
                  width={660}
                  height={660}
                  className="w-full h-auto object-contain"
                  sizes="(min-width: 1024px) 660px, 100vw"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {images.length > 1 && (
        <div className="">
          <Swiper
            slidesPerView={4}
            spaceBetween={8}
            onSwiper={setThumbsSwiper}
            modules={[Thumbs, A11y, Keyboard]}
            watchSlidesProgress
            className=""
          >
            {images.map((image, index) => (
              <SwiperSlide key={`${image.id}-${index}`} className="w-28 h-auto! group">
                {({ isActive }) => (
                  <button
                    type="button"
                    aria-label={`Pokaż zdjęcie ${index + 1}`}
                    aria-current={isActive}
                    className="relative cursor-pointer hover:opacity-85 aspect-square w-full overflow-hidden border-b border-transparent 
                  focus:outline-none focus:ring-2 focus:ring-primary group-[.swiper-slide-thumb-active]:border-black!"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt || productName}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </button>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
