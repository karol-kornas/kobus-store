"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button/Button";
import Image from "next/image";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { Hot } from "@/components/icons/hot";
import { ImageWithSkeleton } from "@/components/ui/imageWithSkeleton/ImageWithSkeleton";
import { formatPrice } from "@/utils/formatPrice";

export function AddToCartDrawer() {
  const { isDrawerOpen, drawerProduct, closeDrawer } = useCart();

  console.log(drawerProduct);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed inset-y-0 right-0 w-full sm:w-105 bg-background z-50 p-6 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Dodano do koszyka</h2>
              <button onClick={closeDrawer} className="cursor-pointer">
                <X />
              </button>
            </div>

            {/* Content */}
            {drawerProduct && (
              <div className="flex gap-4 mb-6">
                {drawerProduct.images?.[0]?.src && (
                  <ImageWithSkeleton
                    src={drawerProduct.images[0].src}
                    srcset={drawerProduct.images[0].srcset}
                    alt={drawerProduct.images[0].alt || drawerProduct.name}
                    fill
                    className="absolute inset-0 size-full object-cover"
                    wrapClassName="w-24 aspect-3/4 overflow-hidden flex-none"
                    sizes="96px"
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
                  <p className="flex gap-2">
                    <strong className="text-lg">{formatPrice(drawerProduct.price)}</strong>

                    {drawerProduct.sale_price !== drawerProduct.regular_price && (
                      <span className="font-normal line-through text-neutral-400">
                        {drawerProduct.regular_price} zł
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-auto flex flex-col gap-3">
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
