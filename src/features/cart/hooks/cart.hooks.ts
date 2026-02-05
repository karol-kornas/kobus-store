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
  const updateCustomer = useCartStore((s) => s.updateCustomer);
  const updatePaymentMethod = useCartStore((s) => s.updatePaymentMethod);

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
    updatePaymentMethod,
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

export function useCartSummary() {
  const totals = useCartStore((s) => s.cart?.totals);
  const fees = useCartStore((s) => s.cart?.fees);
  const productsGross = (totals?.total_items || 0) + (totals?.total_items_tax || 0);
  const shippingGross = (totals?.total_shipping || 0) + (totals?.total_shipping_tax || 0);
  const feesGross = fees?.map((fee) => {
    return {
      key: fee.key,
      name: fee.name,
      feeGross: (fee.totals.total || 0) + (fee.totals.total_tax || 0),
    };
  });
  const totalGross = totals?.total_price || 0;
  const currency = totals?.currency_code;

  return {
    productsGross,
    shippingGross,
    feesGross,
    totalGross,
    currency,
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
