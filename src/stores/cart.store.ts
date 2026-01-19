import { createStore } from "zustand/vanilla";
import { getCart, addToCart, removeFromCart, updateCartItem } from "@/features/cart/cart.client";
import { Cart } from "@/types/cart/cart";

export type CartState = {
  cart: Cart | null;
  isMutating: boolean;
  isSyncing: boolean;
  error: string | null;

  setCart: (cart: Cart) => void;

  fetchCart: () => Promise<void>;
  addItem: (id: number, quantity?: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  updateItem: (key: string, quantity: number) => Promise<void>;
};

export const createCartStore = (initialCart: Cart | null) =>
  createStore<CartState>((set) => ({
    cart: initialCart,
    isMutating: false,
    isSyncing: false,
    error: null,

    setCart: (cart) => set({ cart }),

    fetchCart: async () => {
      set({ isSyncing: true, error: null });
      try {
        const data = await getCart();
        set({ cart: data });
      } catch (err) {
        set({ error: "Failed to fetch cart" });
      } finally {
        set({ isSyncing: false });
      }
    },

    addItem: async (id, quantity = 1) => {
      set({ isMutating: true, error: null });
      try {
        const data = await addToCart(id, quantity);
        set({ cart: data });
      } catch (err) {
        set({ error: "Failed to add item" });
      } finally {
        set({ isMutating: false });
      }
    },

    removeItem: async (key) => {
      set({ isMutating: true, error: null });
      try {
        const data = await removeFromCart(key);
        set({ cart: data });
      } catch (err) {
        set({ error: "Failed to remove item" });
      } finally {
        set({ isMutating: false });
      }
    },

    updateItem: async (key, quantity) => {
      set({ isMutating: true, error: null });
      try {
        const data = await updateCartItem(key, quantity);
        set({ cart: data });
      } catch (err) {
        set({ error: "Failed to update item" });
      } finally {
        set({ isMutating: false });
      }
    },
  }));
