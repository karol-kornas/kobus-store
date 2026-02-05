export type ApiCartFees = {
  key: string;
  name: string;
  totals: {
    total: string;
    total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
};

export type CartFees = {
  key: string;
  name: string;
  totals: {
    total: number | null;
    total_tax: number | null;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
};
