"use client"

import Header from "./components/header/Header";
import { TickerProvider } from "./contexts/TickerContext";
import "./globals.css";

import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, BarElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] transition-colors duration-300">
          <main className="flex min-h-screen flex-col mx-auto w-full max-w-7xl bg-[var(--card)] shadow-[var(--shadow-2xl)] border-l border-r border-[var(--border)]">
            <TickerProvider>
              <Header />
              {children}
            </TickerProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
