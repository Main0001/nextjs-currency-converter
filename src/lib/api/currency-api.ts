import { config } from '@/lib/constants/config';
import type {
  CurrenciesResponse,
  RatesResponse,
} from '@/types/currency';

/**
 * CurrencyAPI client class
 * Handles all communication with CurrencyAPI service
 */
export class CurrencyAPI {
  private baseUrl: string;
  private apiKey: string;
  private timeoutMs: number;
  private maxRetries: number;

  constructor() {
    this.baseUrl = config.currencyApi.baseUrl;
    this.apiKey = config.currencyApi.apiKey;
    this.timeoutMs = config.currencyApi.timeoutMs;
    this.maxRetries = config.currencyApi.maxRetries;
  }

  /**
   * Generic fetch method with retry logic
   */
  private async fetchData<T>(
    endpoint: string,
    params?: Record<string, string>,
    retries = 0
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    // Add API key as query parameter
    url.searchParams.append('apikey', this.apiKey);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

      const response = await fetch(url.toString(), {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `CurrencyAPI Error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      if (retries < this.maxRetries) {
        // Exponential backoff
        const delay = Math.pow(2, retries) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.fetchData<T>(endpoint, params, retries + 1);
      }

      throw error;
    }
  }

  /**
   * Get list of all available currencies
   */
  async getCurrencies(): Promise<CurrenciesResponse> {
    return this.fetchData<CurrenciesResponse>('/currencies');
  }

  /**
   * Get latest exchange rates for a base currency
   * @param baseCurrency - Base currency code (e.g., 'USD')
   * @param currencies - Optional array of target currency codes
   */
  async getLatestRates(
    baseCurrency: string,
    currencies?: string[]
  ): Promise<RatesResponse> {
    const params: Record<string, string> = {
      base_currency: baseCurrency,
    };

    if (currencies && currencies.length > 0) {
      params.currencies = currencies.join(',');
    }

    return this.fetchData<RatesResponse>('/latest', params);
  }

  /**
   * Convert amount from one currency to another
   * @param from - Source currency code
   * @param to - Target currency code
   * @param amount - Amount to convert
   */
  async convert(from: string, to: string, amount: number): Promise<number> {
    const rates = await this.getLatestRates(from, [to]);
    const rate = rates.data[to]?.value;

    if (!rate) {
      throw new Error(`Exchange rate not found for ${to}`);
    }

    return amount * rate;
  }
}

// Export singleton instance
export const currencyApi = new CurrencyAPI();
