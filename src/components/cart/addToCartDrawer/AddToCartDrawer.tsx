"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CircleCheckBig, Info, X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button/Button";

import { useCart, useCartCrossSells } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";
import { CrossSellItem } from "./CrossSellItem";
import { CrossSellItem as CrossSellItemType } from "@/types/cart/crossSellItem";
import { useEffect, useState } from "react";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { QuantitySelector } from "@/components/ui/quantitySelector/QuantitySelector";
import { FreeShippingNotice } from "../freeShippingNotice/FreeShippingNotice";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

export function AddToCartDrawer() {
  const { cart, isDrawerOpen, drawerItemKey, closeDrawer, updateItem, updatingItems } = useCart();
  const crossSellsFromStore = useCartCrossSells();

  const drawerProduct = cart?.items.find((item) => item.key === drawerItemKey);
  const isUpdating = drawerProduct && updatingItems[drawerProduct.key];

  const [initialCrossSells, setInitialCrossSells] = useState<CrossSellItemType[]>([]);

  useEffect(() => {
    if (isDrawerOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialCrossSells(crossSellsFromStore);
    }
  }, [isDrawerOpen]);

  useLockBodyScroll(isDrawerOpen);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />

          <motion.aside
            className="fixed inset-y-0 right-0 w-full sm:w-105 bg-background z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="border-b border-neutral-100">
              <div className="flex items-center justify-between p-6">
                <h2 className="text-xl font-semibold flex gap-4 items-center">
                  <CircleCheckBig size={32} className="text-[#956e50]" />
                  Dodano do koszyka
                </h2>
                <button onClick={closeDrawer} className="cursor-pointer">
                  <X />
                </button>
              </div>

              <FreeShippingNotice />
            </div>

            <div className="overflow-y-auto px-6 py-6">
              {drawerProduct && (
                <div className="flex items-center gap-4">
                  {drawerProduct.images?.[0]?.src && (
                    <SmartImage
                      src={drawerProduct.images[0].src}
                      srcSet={drawerProduct.images[0].srcset}
                      alt={drawerProduct.images[0].alt || drawerProduct.name}
                      sizes="96px"
                      wrapClassName="w-24 aspect-3/4 overflow-hidden flex-none"
                      className="absolute inset-0 size-full object-contain"
                    />
                  )}

                  <div>
                    <p className="font-bold leading-tight">{drawerProduct.name}</p>
                    {drawerProduct.variations && drawerProduct.variations.length > 0 && (
                      <div className="mt-1">
                        {drawerProduct.variations.map((v) => (
                          <p key={v.raw_attribute} className="text-sm">
                            {v.attribute}: <strong>{v.value}</strong>
                          </p>
                        ))}
                      </div>
                    )}
                    <p className="flex gap-2 text-lg">
                      {drawerProduct.quantity} x
                      <strong className="">{formatPrice(drawerProduct.price)}</strong>
                      {drawerProduct.on_sale && (
                        <span className="line-through text-neutral-400 text-base">
                          {formatPrice(drawerProduct.regular_price)}
                        </span>
                      )}
                    </p>
                    <div className="mt-2">
                      <QuantitySelector
                        value={drawerProduct.quantity}
                        size="sm"
                        loading={isUpdating}
                        onChange={(qty) => updateItem(drawerProduct.key, qty)}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-end gap-2 text-right text-[#956e50] leading-[1.2] text-xs mt-3">
                <div className="max-w-2xs">
                  Nie zwlekaj z zakupem, dodanie artykułów do koszyka nie oznacza ich rezerwacji
                </div>
                <Info />
              </div>
              {initialCrossSells.length !== 0 && (
                <div className="py-4 border-t border-cream rounded-lg mt-4">
                  <h3 className="text-lg font-bold">Te rzeczy też moga ci się spodobać:</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    {initialCrossSells.map((product) => (
                      <CrossSellItem key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto flex flex-col gap-3 py-6 px-6 bg-cream">
              <ButtonLink href="/cart" size="lg" variant="special" onClick={closeDrawer}>
                Przejdź do koszyka
              </ButtonLink>

              <Button size="lg" variant="primary" onClick={closeDrawer}>
                Kontynuuj zakupy
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
