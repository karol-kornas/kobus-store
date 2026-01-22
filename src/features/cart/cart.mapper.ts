import { ApiCart, ApiCartItem, ApiCrossSellItem } from "@/types/cart/apiCart";
import { Cart } from "@/types/cart/cart";
import { normalizeCartPrice } from "@/utils/normalizeCartPrice";

export function mapCart(apiCart: ApiCart): Cart {
  return {
    ...apiCart,
    items: apiCart.items.map(mapCartItem),
    totals: {
      ...apiCart.totals,
      total_items: Number(apiCart.totals.total_items),
      total_tax: normalizeCartPrice(apiCart.totals.total_tax),
      total_price: normalizeCartPrice(apiCart.totals.total_price),
      total_shipping: normalizeCartPrice(apiCart.totals.total_price),
    },
    cross_sells: apiCart.cross_sells.map(mapCrossSellItem)
  };
}

function mapCartItem(item: ApiCartItem) {
  return {
    key: item.key,
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: normalizeCartPrice(item.prices.price),
    regular_price: normalizeCartPrice(item.prices.regular_price),
    sale_price: normalizeCartPrice(item.prices.sale_price),
    images:
      item.images?.map((img) => ({
        id: img.id,
        src: img.src,
        srcset: img.srcset,
        alt: img.name,
      })) ?? [],
    variations: item.variation ?? [],
    totals: {
      line_total: normalizeCartPrice(item.totals.line_total),
    },
  };
}

function mapCrossSellItem(item: ApiCrossSellItem) {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    price: normalizeCartPrice(item.prices.price),
    regular_price: normalizeCartPrice(item.prices.regular_price),
    sale_price: normalizeCartPrice(item.prices.sale_price),
    images:
      item.images?.map((img) => ({
        id: img.id,
        src: img.src,
        srcset: img.srcset,
        alt: img.name,
      })) ?? [],
    is_in_stock: item.is_in_stock,
    on_sell: item.on_sell
  };
}
