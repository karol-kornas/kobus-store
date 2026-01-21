import { createStore } from "zustand/vanilla";
import { getCart, addToCart, removeFromCart, updateCartItem } from "@/features/cart/cart.client";
import { Cart } from "@/types/cart/cart";
import { mapCart } from "@/features/cart/cart.mapper";
import { CartItem } from "@/types/cart/cartItem";

export type CartState = {
  cart: Cart | null;
  isMutating: boolean;
  isSyncing: boolean;
  error: string | null;
  isDrawerOpen: boolean;
  drawerProduct: CartItem | null;

  setCart: (cart: Cart) => void;

  fetchCart: () => Promise<void>;
  addItem: (id: number, quantity?: number, product?: CartItem) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  updateItem: (key: string, quantity: number) => Promise<void>;
  openDrawer: (product: CartItem) => void;
  closeDrawer: () => void;
};

export const createCartStore = (initialCart: Cart | null) =>
  createStore<CartState>((set) => ({
    cart: initialCart,
    isMutating: false,
    isSyncing: false,
    error: null,
    isDrawerOpen: false,
    drawerProduct: null,

    setCart: (cart) => set({ cart }),

    fetchCart: async () => {
      set({ isSyncing: true, error: null });
      try {
        const data = await getCart();
        const mapped = mapCart(data);
        set({ cart: mapped });
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
        const mapped = mapCart(data);
        const addedItem = mapped.items.find((item) => item.id === id);
        set({ cart: mapped, isDrawerOpen: true, drawerProduct: addedItem });
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
        const mapped = mapCart(data);
        set({ cart: mapped });
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
        const mapped = mapCart(data);
        set({ cart: mapped });
      } catch (err) {
        set({ error: "Failed to update item" });
      } finally {
        set({ isMutating: false });
      }
    },
    openDrawer: (product) =>
      set({
        isDrawerOpen: true,
        drawerProduct: product,
      }),

    closeDrawer: () =>
      set({
        isDrawerOpen: false,
        drawerProduct: null,
      }),
  }));
