export interface CartTotals {
  total_items: number;
  total_shipping: number | null;
  total_price: number | null;
  total_tax: number | null;
  currency_code: string;
  currency_symbol: string;
  currency_suffix: string;
}
