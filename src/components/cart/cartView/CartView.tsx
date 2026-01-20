"use client";

import { useCart, useCartItems, useCartTotals } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";

export default function CartView() {
  const items = useCartItems();
  const { totalPrice, currency } = useCartTotals();
  const { updateItem, removeItem, isSyncing, isMutating } = useCart();

  if (isSyncing && !items.length) return <p>Ładowanie...</p>;
  if (!items.length) return <p>Koszyk pusty</p>;

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.key}>
            <strong>{item.name}</strong>— {item.quantity}
            <button onClick={() => updateItem(item.key, item.quantity - 1)} disabled={isMutating}>
              -
            </button>
            <button onClick={() => updateItem(item.key, item.quantity + 1)} disabled={isMutating}>
              +
            </button>
            <button onClick={() => removeItem(item.key)} disabled={isMutating}>
              Usuń
            </button>
          </li>
        ))}
      </ul>

      <p>
        <strong>Suma:</strong> {formatPrice(totalPrice, currency)}
      </p>
    </div>
  );
}
