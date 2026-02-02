"use client";

import { create } from "zustand";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  updateCustomer,
  UpdateCustomerPayload,
  selectShippingRate,
} from "@/features/cart/cart.client";
import { Cart } from "@/types/cart/cart";
import { mapCart } from "@/features/cart/cart.mapper";
import { CartItem } from "@/types/cart/cartItem";

export type CartState = {
  cart: Cart | null;
  isMutating: boolean;
  isSyncing: boolean;
  error: string | null;
  isDrawerOpen: boolean;
  drawerItemKey: string | null;
  updatingItems: Record<string, boolean>;

  setCart: (cart: Cart | null) => void;
  fetchCart: () => Promise<void>;
  addItem: (id: number, quantity?: number) => Promise<CartItem | void>;
  removeItem: (key: string) => Promise<void>;
  updateItem: (key: string, quantity: number) => Promise<void>;
  openDrawer: (itemKey: string) => void;
  closeDrawer: () => void;
  selectShippingRate: (packageId: number, rateId: string) => Promise<void>;
  updateCustomer: (payload: UpdateCustomerPayload) => Promise<void>;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isMutating: false,
  isSyncing: false,
  error: null,
  isDrawerOpen: false,
  drawerItemKey: null,
  updatingItems: {},

  setCart: (cart) => set({ cart }),

  fetchCart: async () => {
    set({ isSyncing: true, error: null });
    try {
      const data = await getCart();
      set({ cart: mapCart(data) });
    } catch {
      set({ error: "Failed to fetch cart" });
    } finally {
      set({ isSyncing: false });
    }
  },

  addItem: async (id, quantity = 1) => {
    set({ isMutating: true, error: null });
    try {
      const data = await addToCart(id, quantity);
      const mapped = mapCart(data);
      set({ cart: mapped });
      return mapped.items.find((item) => item.id === id);
    } catch {
      set({ error: "Failed to add item" });
    } finally {
      set({ isMutating: false });
    }
  },

  removeItem: async (key) => {
    set({ isMutating: true, error: null });
    try {
      const data = await removeFromCart(key);
      set({ cart: mapCart(data) });
    } catch {
      set({ error: "Failed to remove item" });
    } finally {
      set({ isMutating: false });
    }
  },

  updateItem: async (key, quantity) => {
    set((state) => ({
      updatingItems: { ...state.updatingItems, [key]: true },
      error: null,
    }));
    try {
      const data = await updateCartItem(key, quantity);
      set({ cart: mapCart(data) });
    } catch {
      set({ error: "Failed to update item" });
    } finally {
      set((state) => ({
        updatingItems: { ...state.updatingItems, [key]: false },
      }));
    }
  },

  openDrawer: (itemKey) => set({ isDrawerOpen: true, drawerItemKey: itemKey }),

  closeDrawer: () => set({ isDrawerOpen: false, drawerItemKey: null }),

  selectShippingRate: async (packageId, rateId) => {
    set({ isMutating: true, error: null });
    try {
      const data = await selectShippingRate(packageId, rateId);
      set({ cart: mapCart(data) });
    } catch {
      set({ error: "Failed to select shipping rate" });
    } finally {
      set({ isMutating: false });
    }
  },

  updateCustomer: async (payload) => {
    set({ isMutating: true, error: null });
    try {
      const data = await updateCustomer(payload);
      set({ cart: mapCart(data) });
    } catch {
      set({ error: "Nie udało się zaktualizować adresu" });
    } finally {
      set({ isMutating: false });
    }
  },
}));
