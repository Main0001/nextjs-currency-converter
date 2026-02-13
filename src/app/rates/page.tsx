"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Star,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useSettings } from "@/lib/context/SettingsContext";
import { useCurrencies } from "@/lib/hooks/useCurrencies";
import { useRates } from "@/lib/hooks/useRates";
import { formatNumber } from "@/lib/utils/currency-formatter";

export default function RatesPage() {
  const {
    baseCurrency,
    setBaseCurrency,
    favorites,
    toggleFavorite,
    isFavorite,
  } = useSettings();
  const {
    data: currenciesData,
    isLoading: currenciesLoading,
    error: currenciesError,
  } = useCurrencies();
  const {
    data: ratesData,
    isLoading: ratesLoading,
    error: ratesError,
  } = useRates(baseCurrency);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredCurrencies = useMemo(() => {
    if (!currenciesData || !ratesData) return [];

    const allCurrencies = Object.values(currenciesData.data).filter(
      (currency) => currency.code !== baseCurrency,
    );

    let filtered = allCurrencies;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (currency) =>
          currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          currency.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter((currency) => isFavorite(currency.code));
    }

    // Sort: favorites first, then alphabetically
    return filtered.sort((a, b) => {
      const aIsFav = isFavorite(a.code);
      const bIsFav = isFavorite(b.code);

      if (aIsFav && !bIsFav) return -1;
      if (!aIsFav && bIsFav) return 1;
      return a.code.localeCompare(b.code);
    });
  }, [
    currenciesData,
    ratesData,
    searchQuery,
    showFavoritesOnly,
    favorites,
    baseCurrency,
    isFavorite,
  ]);

  if (currenciesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (currenciesError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Failed to load currencies</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {currenciesError instanceof Error
                    ? currenciesError.message
                    : "Unknown error"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (ratesError) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Exchange Rates
            </h1>
            <p className="text-muted-foreground mt-2">
              Live exchange rates for all major world currencies
            </p>
          </div>
        </div>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">Failed to load exchange rates</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {ratesError instanceof Error
                    ? ratesError.message
                    : "Unknown error"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Exchange Rates</h1>
          <p className="text-muted-foreground mt-2">
            Live exchange rates for all major world currencies
          </p>
        </div>
        <Card className="w-fit">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">
                  Base Currency
                </span>
              </div>
              <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                <SelectTrigger className="h-9 w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(currenciesData?.data || {}).map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            aria-label="Search currencies"
            placeholder="Search currencies..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={!showFavoritesOnly ? "default" : "outline"}
            className="flex-1 sm:flex-none"
            onClick={() => setShowFavoritesOnly(false)}
          >
            All Currencies
          </Button>
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            className="flex-1 sm:flex-none"
            onClick={() => setShowFavoritesOnly(true)}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </Button>
        </div>
      </div>

      {/* Currency Cards Grid */}
      {ratesLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCurrencies.map((currency) => {
            const rate = ratesData?.data[currency.code]?.value || 0;
            const currencyIsFavorite = isFavorite(currency.code);

            return (
              <Card
                key={currency.code}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold">
                          {currency.code.substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {currency.code}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {currency.name}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={
                        currencyIsFavorite
                          ? "text-yellow-500"
                          : "text-muted-foreground"
                      }
                      onClick={() => toggleFavorite(currency.code)}
                    >
                      <Star
                        className={`h-5 w-5 ${currencyIsFavorite ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-3xl font-bold">
                      {formatNumber(rate, 4)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      1 {baseCurrency} = {formatNumber(rate, 4)} {currency.code}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Last Updated Info */}
      {ratesData && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                Last updated:{" "}
                {new Date(ratesData.meta.last_updated_at).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
