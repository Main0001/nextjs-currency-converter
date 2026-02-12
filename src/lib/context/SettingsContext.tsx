'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { config } from '@/lib/constants/config';

interface SettingsContextType {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  favorites: string[];
  toggleFavorite: (currency: string) => void;
  isFavorite: (currency: string) => boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [baseCurrency, setBaseCurrency] = useLocalStorage<string>(
    'baseCurrency',
    config.app.defaultBaseCurrency
  );

  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const toggleFavorite = (currency: string) => {
    setFavorites((prev) =>
      prev.includes(currency)
        ? prev.filter((c) => c !== currency)
        : [...prev, currency]
    );
  };

  const isFavorite = (currency: string) => favorites.includes(currency);

  return (
    <SettingsContext.Provider
      value={{
        baseCurrency,
        setBaseCurrency,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
