"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button/Button";
import Image from "next/image";
import { useCart } from "@/features/cart/hooks/cart.hooks";

export function AddToCartDrawer() {
  const { isDrawerOpen, drawerProduct, closeDrawer } = useCart();

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
              <button onClick={closeDrawer}>
                <X />
              </button>
            </div>

            {/* Content */}
            {drawerProduct && (
              <div className="flex gap-4 mb-6">
                {drawerProduct.images?.[0]?.src && (
                  <Image
                    src={drawerProduct.images[0].src}
                    alt={drawerProduct.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                )}

                <div>
                  <p className="font-medium">{drawerProduct.name}</p>
                  {drawerProduct.variations && drawerProduct.variations.length > 0 && (
                    <p className="text-muted-foreground text-sm">
                      {drawerProduct.variations.map((v) => `${v.attribute}: ${v.value}`).join(", ")}
                    </p>
                  )}
                  <p className="flex gap-2">
                    {drawerProduct.price} zł
                    {drawerProduct.sale_price && drawerProduct.regular_price && (
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
