'use client';

import { useQuery } from '@tanstack/react-query';
import { currencyApi } from '@/lib/api/currency-api';
import { config } from '@/lib/constants/config';

/**
 * Hook to fetch latest exchange rates
 * @param baseCurrency - Base currency code (e.g., 'USD')
 * @param currencies - Optional array of target currency codes to fetch
 */
export const useRates = (baseCurrency: string, currencies?: string[]) => {
  return useQuery({
    queryKey: ['rates', baseCurrency, currencies],
    queryFn: () => currencyApi.getLatestRates(baseCurrency, currencies),
    staleTime: config.query.ratesStaleTimeMs,
    gcTime: config.query.ratesStaleTimeMs,
    refetchOnWindowFocus: false,
    enabled: !!baseCurrency,
  });
};
