// Currency type
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
}

// Exchange rate type
export interface ExchangeRate {
  code: string;
  value: number;
}

// API response with exchange rates
export interface RatesResponse {
  meta: {
    last_updated_at: string;
  };
  data: Record<string, ExchangeRate>;
}

// API response with currencies list
export interface CurrenciesResponse {
  data: Record<string, Currency>;
}

// User settings
export interface UserSettings {
  baseCurrency: string;
  favorites: string[];
}

// Conversion data
export interface ConversionData {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: Date;
}
