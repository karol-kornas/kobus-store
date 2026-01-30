import { useCartStore } from "@/stores/CartStoreProvider";

const EMPTY_ARRAY: [] = [];

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
  };
}

export function useCartCount() {
  return useCartStore((s) => s.cart?.items_count ?? 0);
}

export function useCartItems() {
  return useCartStore((s) => s.cart?.items ?? []);
}

export function useCartTotals() {
  const totals = useCartStore((s) => s.cart?.totals);

  if (!totals) {
    return {
      totalItems: 0,
      totalPrice: 0,
      currency: "PLN",
      currencySymbol: "zł",
    };
  }

  return {
    totalItems: totals.total_items,
    totalPrice: totals.total_price,
    currency: totals.currency_code,
    currencySymbol: totals.currency_symbol,
  };
}

export function useCartCrossSells() {
  return useCartStore((s) => s.cart?.cross_sells ?? []);
}

export function useCartShippingRates() {
  return useCartStore((s) => {
    const pkg = s.cart?.shipping_rates?.[0];
    return pkg?.shipping_rates;
  });
}

export function useCartShippingAddress() {
  return useCartStore((s) => s.cart?.shipping_address);
}
