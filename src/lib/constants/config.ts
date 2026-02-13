export const appConfig = () => ({
  // CurrencyAPI
  currencyApi: {
    apiKey: process.env.NEXT_PUBLIC_CURRENCY_API_KEY || "",
    baseUrl: process.env.NEXT_PUBLIC_CURRENCY_API_URL || "https://api.currencyapi.com/v3",
    timeoutMs: parseInt(process.env.CURRENCY_API_TIMEOUT_MS || "10000", 10), // ms (10 seconds)
    maxRetries: parseInt(process.env.CURRENCY_API_MAX_RETRIES || "3", 10),
  },

  // React Query Settings
  query: {
    currenciesStaleTimeMs: parseInt(process.env.CURRENCIES_STALE_TIME_MS || "86400000", 10), // ms (24 hours)
    ratesStaleTimeMs: parseInt(process.env.RATES_STALE_TIME_MS || "300000", 10), // ms (5 minutes)
  },

  // App Settings
  app: {
    defaultBaseCurrency: process.env.DEFAULT_BASE_CURRENCY || "USD",
    maxConversionAmount: parseInt(process.env.MAX_CONVERSION_AMOUNT || "1000000000", 10),
    minConversionAmount: parseFloat(process.env.MIN_CONVERSION_AMOUNT || "0.01"),
    defaultDecimalPlaces: parseInt(process.env.DEFAULT_DECIMAL_PLACES || "2", 10),
  },
});

// Config types
export type AppConfig = ReturnType<typeof appConfig>;

// Export config instance
export const config = appConfig();