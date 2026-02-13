import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ArrowRightLeft, TrendingUp } from "lucide-react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "Convert currencies with real-time rates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          {/* Header with navigation */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link
                  href="/"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                    <ArrowRightLeft className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">CurrencyHub</h1>
                    <p className="text-xs text-muted-foreground">
                      Real-time Rates
                    </p>
                  </div>
                </Link>
                <nav className="flex gap-1">
                  <Link
                    href="/"
                    className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
                  >
                    Converter
                  </Link>
                  <Link
                    href="/rates"
                    className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground font-medium transition-colors flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Rates
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="container mx-auto px-4 py-8 flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t bg-muted/50 mt-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © 2026 CurrencyHub. Powered by CurrencyAPI.
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
