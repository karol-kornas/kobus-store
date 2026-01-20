export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number | null;
  regular_price: number | null;
  sale_price: number | null;
  on_sale: boolean;
  images: {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  lowest_price_30_days?: number | null;
  short_description?: string;
  description?: string;
  additional_services: AdditionalService[];
  product_variants: ProductVariant[];
  stock_quantity: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  variations: Variation[];
};

export type AdditionalService = {
  id: number;
  name: string;
  price: number;
  thumbnail: string | null;
  thumbnail_width: number | null;
  thumbnail_height: number | null;
  preview_image: string | null;
  preview_image_width: number | null;
  preview_image_height: number | null;
  add_to_cart_url: string;
};

export type ProductVariant = {
  id: number;
  name: string;
  slug: string;
  price: number | null;
  thumbnail: string | null;
  thumbnail_width: number | null;
  thumbnail_height: number | null;
};

export type VariationAttribute = {
  slug: string;
  label: string;
  value: string;
};

export type Variation = {
  id: number;
  price: number;
  attributes: VariationAttribute[];
  is_in_stock: boolean;
};
