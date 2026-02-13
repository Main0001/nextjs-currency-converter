import { config } from '@/lib/constants/config';

/**
 * Format number with specific decimal places
 * @param value - Number to format
 * @param decimals - Number of decimal places (default from env: DEFAULT_DECIMAL_PLACES)
 */
export const formatNumber = (
  value: number,
  decimals: number = config.app.defaultDecimalPlaces
): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};