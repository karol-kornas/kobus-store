"use client";

import { CrossSellItem } from "@/components/cart/addToCartDrawer/CrossSellItem";
import { CartItem } from "@/components/cart/cartView/CartItem";
import CartView from "@/components/cart/cartView/CartView";
import { useCart, useCartCrossSells, useCartItems } from "@/features/cart/hooks/cart.hooks";
import { pluralize } from "@/utils/pluralize";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button/Button";
import { SpecialOffer } from "@/components/cart/cartView/SpecialOffer";
import { AdditionalServices } from "@/components/cart/additionalServices/AdditionalServices";

export default function CartPage() {
  const { cart } = useCart();
  const items = useCartItems();
  const crossSellsFromStore = useCartCrossSells();

  console.log(cart);

  if (!items.length)
    return (
      <div className="gap-3 py-6 flex flex-col justify-center items-center min-h-[58vh]">
        <div className="flex items-center justify-center size-20 rounded-full bg-neutral-200">
          <ShoppingBag size="42" />
        </div>
        <h1 className="font-display text-3xl font-medium text-center">Koszyk jest pusty</h1>
        <div className="flex flex-wrap justify-center items-center gap-4 py-6">
          <ButtonLink href="/">Odwiedź stronę główną</ButtonLink>
          <ButtonLink href="/category/sale" variant="secondary">
            Odkryj promocje
          </ButtonLink>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex flex-col md:flex-row lg:items-end justify-between gap-3 py-6 max-sm:px-3">
        <h1 className="font-display text-3xl font-medium">
          Koszyk
          <span className="text-[0.5em] text-neutral-500 font-sans uppercase ml-2">
            ({items.length} {pluralize(items.length, "produkt", "produkty", "produktów")})
          </span>
        </h1>
        <div className="text-[0.875rem]">
          Przewidywany czas dostawy <strong>1-2 dni</strong>
        </div>
      </div>
      <div className="grid lg:grid-cols-[540fr_325fr] gap-8">
        <div>
          <div className="">
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item.key}>
                  <CartItem item={item} />
                  <SpecialOffer parentItem={item} />
                </li>
              ))}
            </ul>
            <AdditionalServices />
          </div>
        </div>
        <div>
          <CartView />
        </div>
      </div>

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
    </>
  );
}
