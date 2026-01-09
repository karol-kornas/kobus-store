"use client";

import { CategoriesSectionData } from "./categoriesSection.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CategoryCard } from "@/components/ui/categoryCard/CategoryCard";

interface Props {
  section: CategoriesSectionData;
}

export function CategoriesSection({ section }: Props) {
  return (
    <section className="pt-10">
      <div className="container">
        <h3 className="font-display text-[1.625rem] font-semibold">{section.title}</h3>

        <Swiper
          className="mt-6"
          style={
            {
              "--swiper-pagination-color": "var(--foreground)",
              "--swiper-pagination-bullet-inactive-color": "var(--foreground)",
              "--swiper-pagination-bullet-width": "0.75rem",
              "--swiper-pagination-bullet-height": "0.75rem",
              "--swiper-pagination-bottom": "2rem",
            } as React.CSSProperties
          }
          // install Swiper modules
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1.25}
          speed={700}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1.75,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {section.categories.map((category) => {
            return (
              <SwiperSlide key={category.id}>
                <CategoryCard category={category} />
              </SwiperSlide>
            );
          })}
          <div className="swiper-pagination static! w-full! flex justify-center mt-5"></div>
        </Swiper>
      </div>
    </section>
  );
}
