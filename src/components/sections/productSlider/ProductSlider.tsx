import { ProductSliderSkeleton } from "./ProductSliderSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCard } from "@/components/ui/productCard/ProductCard";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
};

export function ProductSlider({ products, isLoading, isError }: Props) {
  if (isLoading) {
    return <ProductSliderSkeleton productsLength={6} />;
  }

  if (isError) {
    return <p>Nie udało się pobrać produktów</p>;
  }

  return (
    <Swiper
      className="mt-3"
      style={
        {
          "--swiper-pagination-color": "var(--foreground)",
          "--swiper-pagination-bullet-inactive-color": "var(--foreground)",
          "--swiper-pagination-bullet-width": "0.75rem",
          "--swiper-pagination-bullet-height": "0.75rem",
          "--swiper-pagination-bottom": "2rem",
        } as React.CSSProperties
      }
      modules={[Navigation, Pagination]}
      spaceBetween={24}
      slidesPerView={1.25}
      slidesPerGroup={1}
      speed={700}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 1.75,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      }}
    >
      {products.map((product) => {
        return (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        );
      })}
      <div className="swiper-pagination static! w-full! flex justify-center mt-8"></div>
    </Swiper>
  );
}
