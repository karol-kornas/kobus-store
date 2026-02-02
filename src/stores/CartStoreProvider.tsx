"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createCartStore, CartState } from "./cart.store";
import { Cart } from "@/types/cart/cart";

type CartStore = ReturnType<typeof createCartStore>;

const CartStoreContext = createContext<CartStore | null>(null);

export function CartStoreProvider({
  initialCart,
  children,
}: {
  initialCart: Cart;
  children: React.ReactNode;
}) {
  const [store] = useState(() => createCartStore(initialCart));

  return <CartStoreContext.Provider value={store}>{children}</CartStoreContext.Provider>;
}

export function useCartStore<T>(selector: (state: CartState) => T) {
  const store = useContext(CartStoreContext);
  if (!store) throw new Error("useCartStore must be used within CartStoreProvider");
  return useStore(store, selector);
}
