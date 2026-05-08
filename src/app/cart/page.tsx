"use client";

import { CartItem } from "@/components/cart/cartView/CartItem";
import CartView from "@/components/cart/cartView/CartView";
import { useCartItems } from "@/features/cart/hooks/cart.hooks";
import { pluralize } from "@/utils/pluralize";

import "swiper/css";
import "swiper/css/pagination";
import { ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button/Button";
import { SpecialOffer } from "@/components/cart/cartView/SpecialOffer";
import { AdditionalServices } from "@/components/cart/additionalServices/AdditionalServices";
import { CrossSells } from "@/components/cart/crossSells/crossSells";

export default function CartPage() {
  const items = useCartItems();

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
          Przewidywany czas dostawy <strong>1-2 dni </strong>
        </div>
      </div>
      <div className="grid lg:grid-cols-[540fr_325fr] gap-8 min-h-[49.5vh]">
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
      <CrossSells />
    </>
  );
}
