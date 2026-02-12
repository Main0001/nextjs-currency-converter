/**
 * Format amount as currency with proper symbol and decimal places
 * @param amount - Amount to format
 * @param currencyCode - Currency code (e.g., 'USD')
 * @param locale - Locale string (default: 'en-US')
 */
export const formatCurrency = (
  amount: number,
  currencyCode: string,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount);
};

/**
 * Format number with specific decimal places
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 2)
 */
export const formatNumber = (
  value: number,
  decimals: number = 2
): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Calculate percentage change
 * @param oldRate - Old exchange rate
 * @param newRate - New exchange rate
 */
export const calculatePercentageChange = (
  oldRate: number,
  newRate: number
): number => {
  return ((newRate - oldRate) / oldRate) * 100;
};
