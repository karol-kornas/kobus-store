import { useCartStore } from "@/stores/CartStoreProvider";
import { CartItem } from "@/types/cart/cartItem";
import { removeFromCart } from "../cart.client";
import { money } from "@/utils/money";

const EMPTY_ARRAY: [] = [];

export function useCart() {
  const cart = useCartStore((s) => s.cart);
  const isMutating = useCartStore((s) => s.isMutating);
  const isSyncing = useCartStore((s) => s.isSyncing);
  const error = useCartStore((s) => s.error);
  const selectedPaymentMethod = useCartStore((s) => s.selectedPaymentMethod);
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const drawerItemKey = useCartStore((s) => s.drawerItemKey);
  const updatingItems = useCartStore((s) => s.updatingItems);
  const coupons = useCartStore((s) => s.cart?.coupons ?? []);
  const needsShipping = useCartStore((s) => s.cart?.needs_shipping);
  const needsPayment = useCartStore((s) => s.cart?.needs_payment);

  const fetchCart = useCartStore((s) => s.fetchCart);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItem = useCartStore((s) => s.updateItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const selectShippingRate = useCartStore((s) => s.selectShippingRate);
  const updateCustomer = useCartStore((s) => s.updateCustomer);
  const updatePaymentMethod = useCartStore((s) => s.updatePaymentMethod);
  const addCoupon = useCartStore((s) => s.addCoupon);
  const deleteCoupon = useCartStore((s) => s.deleteCoupon);

  return {
    cart,
    isMutating,
    isSyncing,
    error,
    selectedPaymentMethod,
    isDrawerOpen,
    drawerItemKey,
    updatingItems,
    coupons,
    needsShipping,
    needsPayment,
    fetchCart,
    addItem,
    removeItem,
    updateItem,
    openDrawer,
    closeDrawer,
    selectShippingRate,
    updateCustomer,
    updatePaymentMethod,
    addCoupon,
    deleteCoupon,
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
  const lineItems = useCartStore((s) => s.cart?.items);
  const coupons = useCartStore((s) => s.cart?.coupons ?? []);

  const productsGross = money.add(totals?.total_items || 0, totals?.total_items_tax || 0);

  const regularProductsGross =
    lineItems?.reduce((sum, item) => sum + (item.regular_price ?? item.price ?? 0) * item.quantity, 0) ?? 0;

  const shippingGross = money.add(totals?.total_shipping || 0, totals?.total_shipping_tax || 0);

  const feesGross = fees?.map((fee) => ({
    key: fee.key,
    name: fee.name,
    feeGross: money.add(fee.totals.total || 0, fee.totals.total_tax || 0),
  }));

  const productSavings = calculateSavings(lineItems);

  const couponSavings = coupons.reduce(
    (sum, coupon) =>
      money.add(sum, money.add(coupon.totals?.total_discount || 0, coupon.totals?.total_discount_tax || 0)),
    0,
  );

  const totalSavings = money.add(productSavings, couponSavings);

  const totalGross = totals?.total_price || 0;
  const currency = totals?.currency_code;

  return {
    productsGross,
    regularProductsGross,
    shippingGross,
    feesGross,
    savings: totalSavings,
    productSavings,
    couponSavings,
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

function calculateSavings(lineItems?: CartItem[]) {
  if (!lineItems) return 0;

  return lineItems.reduce((sum, item) => {
    const regular = Number(item.regular_price ?? 0);
    const sale = Number(item.price ?? 0);

    if (regular > sale) {
      return sum + (regular - sale) * item.quantity;
    }

    return sum;
  }, 0);
}

export function useReplaceCartItem() {
  const { addItem } = useCart();

  return async function replaceCartItem(oldKey: string, newProductId: number) {
    try {
      // await removeItem(oldKey);
      await removeFromCart(oldKey);

      await addItem(newProductId, 1);

      // // 4️⃣ refetch koszyka (opcjonalnie, jeśli add/remove nie odświeża w pełni)
      // await fetchCart();
    } catch (err) {
      console.error("Błąd przy zamianie produktu:", err);
    }
  };
}
