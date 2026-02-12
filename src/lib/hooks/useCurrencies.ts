'use client';

import { useQuery } from '@tanstack/react-query';
import { currencyApi } from '@/lib/api/currency-api';
import { config } from '@/lib/constants/config';

/**
 * Hook to fetch all available currencies
 * Data is cached based on CURRENCIES_STALE_TIME_MS env variable
 */
export const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => currencyApi.getCurrencies(),
    staleTime: config.query.currenciesStaleTimeMs,
    gcTime: config.query.currenciesStaleTimeMs,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
