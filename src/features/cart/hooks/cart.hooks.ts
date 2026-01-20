import { useCartStore } from "@/stores/CartStoreProvider";

export function useCart() {
  const cart = useCartStore((s) => s.cart);
  const isMutating = useCartStore((s) => s.isMutating);
  const isSyncing = useCartStore((s) => s.isSyncing);
  const error = useCartStore((s) => s.error);
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const drawerProduct = useCartStore((s) => s.drawerProduct);

  const fetchCart = useCartStore((s) => s.fetchCart);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItem = useCartStore((s) => s.updateItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const closeDrawer = useCartStore((s) => s.closeDrawer);

  return {
    cart,
    isMutating,
    isSyncing,
    error,
    isDrawerOpen,
    drawerProduct,
    fetchCart,
    addItem,
    removeItem,
    updateItem,
    openDrawer,
    closeDrawer,
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
