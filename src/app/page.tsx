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
import { ArrowDownUp, TrendingUp, Clock } from "lucide-react";

export default function ConverterPage() {
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
                defaultValue="1000"
              />
              <Select defaultValue="usd">
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">🇺🇸 USD - US Dollar</SelectItem>
                  <SelectItem value="eur">🇪🇺 EUR - Euro</SelectItem>
                  <SelectItem value="gbp">🇬🇧 GBP - British Pound</SelectItem>
                  <SelectItem value="jpy">🇯🇵 JPY - Japanese Yen</SelectItem>
                  <SelectItem value="rub">🇷🇺 RUB - Russian Ruble</SelectItem>
                  <SelectItem value="cny">🇨🇳 CNY - Chinese Yuan</SelectItem>
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
                value="850.00"
              />
              <Select defaultValue="eur">
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eur">🇪🇺 EUR - Euro</SelectItem>
                  <SelectItem value="usd">🇺🇸 USD - US Dollar</SelectItem>
                  <SelectItem value="gbp">🇬🇧 GBP - British Pound</SelectItem>
                  <SelectItem value="jpy">🇯🇵 JPY - Japanese Yen</SelectItem>
                  <SelectItem value="rub">🇷🇺 RUB - Russian Ruble</SelectItem>
                  <SelectItem value="cny">🇨🇳 CNY - Chinese Yuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Exchange Rate</span>
                </div>
                <span className="font-bold text-lg">1 USD = 0.85 EUR</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Last updated: February 11, 2026, 10:00 AM</span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
