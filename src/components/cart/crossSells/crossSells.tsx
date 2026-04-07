import { useCartCrossSells } from "@/features/cart/hooks/cart.hooks";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CrossSellItem } from "../addToCartDrawer/CrossSellItem";

export function CrossSells() {
  const crossSellsFromStore = useCartCrossSells();

  if (!crossSellsFromStore?.length) {
    return null;
  }

  return (
    <section className="rounded-lg bg-white px-3 py-6 sm:px-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)] mt-10">
      <h3 className={`font-display text-[1.25rem] sm:text-[1.625rem] font-semibold`}>
        Te rzeczy też moga ci się spodobać:
      </h3>
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
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {crossSellsFromStore.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <CrossSellItem key={product.id} product={product} />
            </SwiperSlide>
          );
        })}
        <div className="swiper-pagination static! w-full! flex justify-center mt-8"></div>
      </Swiper>
    </section>
  );
}
