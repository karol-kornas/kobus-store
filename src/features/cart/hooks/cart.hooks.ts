import { useCartStore } from "@/stores/CartStoreProvider";

export function useCart() {
  const cart = useCartStore((s) => s.cart);
  const isMutating = useCartStore((s) => s.isMutating);
  const isSyncing = useCartStore((s) => s.isSyncing);
  const error = useCartStore((s) => s.error);

  const fetchCart = useCartStore((s) => s.fetchCart);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItem = useCartStore((s) => s.updateItem);

  return {
    cart,
    isMutating,
    isSyncing,
    error,
    fetchCart,
    addItem,
    removeItem,
    updateItem,
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
      formattedTotal: "0 zł",
    };
  }

  const totalItems = Number(totals.total_items);
  const totalPrice = Number(totals.total_price) / 100;
  const currency = totals.currency_code;
  const currencySymbol = totals.currency_symbol;

  const formattedTotal = `${totalPrice.toFixed(2).replace(".", ",")} ${currencySymbol}`;

  return {
    totalItems,
    totalPrice,
    currency,
    currencySymbol,
    formattedTotal,
  };
}
