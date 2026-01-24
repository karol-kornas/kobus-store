import { ApiCart, ApiCartItem, ApiCrossSellItem } from "@/types/cart/apiCart";
import { Cart } from "@/types/cart/cart";
import { Product } from "@/types/product";
import { normalizeCartPrice } from "@/utils/normalizeCartPrice";
import { decode } from "html-entities";

export function mapCart(apiCart: ApiCart): Cart {
  return {
    ...apiCart,
    items: apiCart.items.map(mapCartItem),
    totals: {
      ...apiCart.totals,
      total_items: normalizeCartPrice(apiCart.totals.total_items),
      total_tax: normalizeCartPrice(apiCart.totals.total_tax),
      total_price: normalizeCartPrice(apiCart.totals.total_price),
      total_shipping: normalizeCartPrice(apiCart.totals.total_price),
    },
    cross_sells: apiCart.cross_sells.map(mapCrossSellItem),
  };
}

function mapCartItem(item: ApiCartItem) {
  const price = normalizeCartPrice(item.prices.price);
  const regularPrice = normalizeCartPrice(item.prices.regular_price);
  const salePrice = normalizeCartPrice(item.prices.sale_price);

  const isOnSale = regularPrice != null && salePrice != null && salePrice < regularPrice;

  return {
    key: item.key,
    id: item.id,
    name: decode(item.name),
    quantity: item.quantity,
    price: price,
    regular_price: regularPrice,
    sale_price: salePrice,
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
    on_sale: isOnSale,
  };
}

function mapCrossSellItem(item: ApiCrossSellItem) {
  return {
    id: item.id,
    name: decode(item.name),
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
    on_sell: item.on_sale,
  };
}

export function mapUpsellToCrossSell(product: Product): ApiCrossSellItem {
  const toStorePrice = (price: number | string | null) =>
    price == null || price === "" ? "" : String(Math.round(Number(price) * 100));
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,

    images: product.images?.map((img) => ({
      id: img.id,
      src: img.src,
      srcset: img.srcset ?? "",
      name: img.name ?? product.name,
    })),

    prices: {
      price: toStorePrice(product.price),
      regular_price: toStorePrice(product.regular_price),
      sale_price: toStorePrice(product.sale_price),
    },

    is_in_stock: product.stock_status === "instock",
    on_sale: product.on_sale,
  };
}
