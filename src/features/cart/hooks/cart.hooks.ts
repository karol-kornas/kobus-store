import { useCartStore } from "@/stores/cart.store";

/**
 * Stałe referencje – KLUCZOWE dla braku infinite loop
 */
const EMPTY_ARRAY: [] = [];
const EMPTY_TOTALS = {
  totalItems: 0,
  totalPrice: 0,
  currency: "PLN",
  currencySymbol: "zł",
};

export function useCart() {
  const cart = useCartStore((s) => s.cart);
  const isMutating = useCartStore((s) => s.isMutating);
  const isSyncing = useCartStore((s) => s.isSyncing);
  const error = useCartStore((s) => s.error);
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const drawerItemKey = useCartStore((s) => s.drawerItemKey);
  const updatingItems = useCartStore((s) => s.updatingItems);

  const fetchCart = useCartStore((s) => s.fetchCart);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItem = useCartStore((s) => s.updateItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const selectShippingRate = useCartStore((s) => s.selectShippingRate);
  const updateCustomer = useCartStore((s) => s.updateCustomer);

  return {
    cart,
    isMutating,
    isSyncing,
    error,
    isDrawerOpen,
    drawerItemKey,
    updatingItems,
    fetchCart,
    addItem,
    removeItem,
    updateItem,
    openDrawer,
    closeDrawer,
    selectShippingRate,
    updateCustomer,
  };
}

export function useCartCount() {
  return useCartStore((s) => s.cart?.items_count ?? 0);
}

export function useCartItems() {
  return useCartStore((s) => s.cart?.items ?? EMPTY_ARRAY);
}

export function useCartTotals() {
  const totalItems = useCartStore((s) => s.cart?.totals?.total_items ?? 0);
  const totalPrice = useCartStore((s) => s.cart?.totals?.total_price ?? 0);
  const currency = useCartStore((s) => s.cart?.totals?.currency_code ?? "PLN");
  const currencySymbol = useCartStore((s) => s.cart?.totals?.currency_symbol ?? "zł");

  return {
    totalItems,
    totalPrice,
    currency,
    currencySymbol,
  };
}

export function useCartCrossSells() {
  return useCartStore((s) => s.cart?.cross_sells ?? EMPTY_ARRAY);
}

export function useCartShippingRates() {
  return useCartStore((s) => s.cart?.shipping_rates?.[0]?.shipping_rates ?? EMPTY_ARRAY);
}

export function useCartPaymentMethods() {
  return useCartStore((s) => s.cart?.payment_methods ?? EMPTY_ARRAY);
}

export function useCartShippingAddress() {
  return useCartStore((s) => s.cart?.shipping_address);
}

export function useCartBillingAddress() {
  return useCartStore((s) => s.cart?.billing_address);
}
