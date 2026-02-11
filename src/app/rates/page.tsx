import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, TrendingUp, TrendingDown, Clock, DollarSign } from "lucide-react";

export default function RatesPage() {
  const currencies = [
    { code: "EUR", name: "Euro", flag: "🇪🇺", rate: 0.85, change: 0.12, isFavorite: false },
    { code: "GBP", name: "British Pound", flag: "🇬🇧", rate: 0.73, change: -0.08, isFavorite: true },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", rate: 110.25, change: 0.45, isFavorite: false },
    { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", rate: 0.92, change: 0.03, isFavorite: false },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", rate: 1.25, change: -0.15, isFavorite: true },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", rate: 1.32, change: 0.22, isFavorite: false },
    { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", rate: 75.5, change: 1.2, isFavorite: false },
    { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", rate: 6.45, change: -0.05, isFavorite: false },
    { code: "INR", name: "Indian Rupee", flag: "🇮🇳", rate: 74.25, change: 0.18, isFavorite: false },
  ];

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
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Base Currency</p>
                <p className="font-bold">USD - US Dollar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search currencies..."
            className="pl-10 h-12"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="default" className="flex-1 sm:flex-none">
            All Currencies
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </Button>
        </div>
      </div>

      {/* Currency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currencies.map((currency) => (
          <Card key={currency.code} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currency.flag}</span>
                  <div>
                    <CardTitle className="text-xl">{currency.code}</CardTitle>
                    <CardDescription className="text-sm">
                      {currency.name}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={currency.isFavorite ? "text-yellow-500" : "text-muted-foreground"}
                >
                  <Star className={`h-5 w-5 ${currency.isFavorite ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-3xl font-bold">
                  {currency.rate.toFixed(4)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  1 USD = {currency.rate.toFixed(4)} {currency.code}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {currency.change >= 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      +{currency.change.toFixed(2)}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600 font-medium">
                      {currency.change.toFixed(2)}%
                    </span>
                  </>
                )}
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Last Updated Info */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: February 11, 2026, 10:00 AM</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
