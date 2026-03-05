import { createStore } from "zustand/vanilla";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  updateCustomer,
  UpdateCustomerPayload,
  deleteCartCoupon,
  addCartCoupon,
} from "@/features/cart/cart.client";
import { Cart } from "@/types/cart/cart";
import { mapCart } from "@/features/cart/cart.mapper";
import { CartItem } from "@/types/cart/cartItem";
import { selectShippingRate } from "@/features/cart/cart.client";
import { updatePaymentMethod } from "@/features/checkout/checkout.client";

export type CartState = {
  cart: Cart | null;
  isMutating: boolean;
  isSyncing: boolean;
  error: string | null;
  selectedPaymentMethod: string | null;
  isDrawerOpen: boolean;
  drawerItemKey: string | null;
  updatingItems: Record<string, boolean>;

  setCart: (cart: Cart) => void;

  fetchCart: () => Promise<void>;
  addItem: (id: number, quantity?: number) => Promise<CartItem | void>;
  removeItem: (key: string) => Promise<void>;
  updateItem: (key: string, quantity: number) => Promise<void>;
  openDrawer: (itemKey: string) => void;
  closeDrawer: () => void;
  selectShippingRate: (packageId: number, rateId: string) => Promise<Cart | undefined>;
  updateCustomer: (payload: UpdateCustomerPayload) => Promise<Cart | undefined>;
  updatePaymentMethod: (payment_method: string) => Promise<Cart | undefined>;
  setSelectedPaymentMethod: (method: string) => void;
  addCoupon: (code: string) => Promise<void>;
  deleteCoupon: (code: string) => Promise<void>;
};

export const createCartStore = (initialCart: Cart | null) =>
  createStore<CartState>((set, get) => ({
    cart: initialCart,
    isMutating: false,
    isSyncing: false,
    error: null,
    selectedPaymentMethod: null,
    isDrawerOpen: false,
    drawerItemKey: null,
    updatingItems: {},

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

    setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

    addItem: async (id, quantity = 1) => {
      set({ isMutating: true, error: null });
      try {
        const data = await addToCart(id, quantity);
        const mapped = mapCart(data);
        const addedItem = mapped.items.find((item) => item.id === id);

        set({ cart: mapped });

        return addedItem;
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
      set((state) => ({
        updatingItems: {
          ...state.updatingItems,
          [key]: true,
        },
        error: null,
      }));
      try {
        const data = await updateCartItem(key, quantity);
        const mapped = mapCart(data);
        set({ cart: mapped });
      } catch (err) {
        set({ error: "Failed to update item" });
      } finally {
        set((state) => ({
          updatingItems: {
            ...state.updatingItems,
            [key]: false,
          },
        }));
      }
    },
    openDrawer: (itemKey) =>
      set({
        isDrawerOpen: true,
        drawerItemKey: itemKey,
      }),

    closeDrawer: () =>
      set({
        isDrawerOpen: false,
        drawerItemKey: null,
      }),
    selectShippingRate: async (packageId, rateId) => {
      set({ isMutating: true, error: null });

      try {
        const data = await selectShippingRate(packageId, rateId);
        const mapped = mapCart(data);
        set({ cart: mapped });
        return mapped;
      } catch {
        set({ error: "Failed to select shipping rate" });
      } finally {
        set({ isMutating: false });
      }
    },
    updateCustomer: async (payload: UpdateCustomerPayload) => {
      set({ isMutating: true, error: null });

      try {
        const data = await updateCustomer(payload);
        const mapped = mapCart(data);
        set({ cart: mapped });
        return mapped;
      } catch {
        set({ error: "Nie udało się zaktualizować adresu" });
      } finally {
        set({ isMutating: false });
      }
    },
    updatePaymentMethod: async (payment_method: string) => {
      set({ isMutating: true, error: null });
      try {
        const data = await updatePaymentMethod(payment_method);
        set({
          selectedPaymentMethod: payment_method,
        });
        if (data?.__experimentalCart) {
          const mapped = mapCart(data.__experimentalCart);
          set({ cart: mapped });
          return mapped;
        }
      } catch {
        set({ error: "Failed to update payment method" });
      } finally {
        set({ isMutating: false });
      }
    },
    addCoupon: async (code: string) => {
      set({ isMutating: true, error: null });
      try {
        await addCartCoupon(code);
        await get().fetchCart();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid or expired coupon";
        set({ error: message });
        throw new Error(message);
      } finally {
        set({ isMutating: false });
      }
    },

    deleteCoupon: async (code: string) => {
      set({ isMutating: true, error: null });
      try {
        await deleteCartCoupon(code);
        await get().fetchCart();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to delete coupon";
        set({ error: message });
        throw new Error(message);
      } finally {
        set({ isMutating: false });
      }
    },
  }));
