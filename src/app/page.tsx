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
import { ArrowDownUp, TrendingUp, Clock, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSettings } from "@/lib/context/SettingsContext";
import { useCurrencies } from "@/lib/hooks/useCurrencies";
import { useRates } from "@/lib/hooks/useRates";
import { formatNumber } from "@/lib/utils/currency-formatter";

export default function ConverterPage() {
  const { baseCurrency } = useSettings();
  const { data: currenciesData, isLoading: currenciesLoading, error: currenciesError } =
    useCurrencies();

  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState<string>(baseCurrency);
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<string>("0");

  const { data: ratesData, isLoading: ratesLoading, error: ratesError } = useRates(fromCurrency, [
    toCurrency,
  ]);

  // Update fromCurrency when baseCurrency changes
  useEffect(() => {
    setFromCurrency(baseCurrency);
  }, [baseCurrency]);

  // Calculate conversion when data changes
  useEffect(() => {
    if (ratesData && amount) {
      const rate = ratesData.data[toCurrency]?.value;
      if (rate) {
        const converted = parseFloat(amount) * rate;
        setResult(converted.toFixed(6));
      }
    }
  }, [ratesData, amount, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const currencies = Object.values(currenciesData?.data || {});
  const rate = ratesData?.data[toCurrency]?.value;
  const lastUpdated = ratesData?.meta.last_updated_at;

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
                  {currenciesError instanceof Error ? currenciesError.message : 'Unknown error'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Currency Converter
        </h1>
        <p className="text-muted-foreground text-lg">
          Convert currencies with real-time exchange rates from around the world
        </p>
      </div>

      {/* Main Converter Card */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Convert Currency</CardTitle>
          <CardDescription>
            Enter the amount and select currencies to convert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* From Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="1000.00"
                className="text-lg h-12"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={handleSwap}
              disabled={ratesLoading}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          {/* To Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="0.00"
                className="text-lg h-12 bg-muted"
                readOnly
                value={result}
              />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <Card className={ratesError ? "bg-destructive/10" : "bg-muted/50"}>
            <CardContent className="pt-6 space-y-3">
              {ratesError ? (
                <div className="flex items-center gap-3 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Failed to load exchange rate</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {ratesError instanceof Error ? ratesError.message : 'Unknown error'}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Exchange Rate</span>
                    </div>
                    {rate ? (
                      <span className="font-bold text-lg">
                        1 {fromCurrency} = {formatNumber(rate, 4)} {toCurrency}
                      </span>
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                  {lastUpdated && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        Last updated: {new Date(lastUpdated).toLocaleString()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
