export type CartCoupon = {
  code: string;
  type: string;
  totals: {
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    total_discount: number | null;
    total_discount_tax: number | null;
  };
};
