'use client';

import { API_CONFIG } from '@/next.config';
import { useEffect, useState } from 'react';
import TickerInput from './ticker/TickerInput';
import { BackendResponse, NasdaqEntry } from './types';
import { parseTickersData } from './utils/parseNasdaqData';

export default function Dashboard() {
  const [backendLoaded, setBackendLoaded] = useState(false);
  const [nasdaqData, setNasdaqData] = useState<NasdaqEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tickerValue, setTickerValue] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadBackendData = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TICKER_LIST}`);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        const result: BackendResponse = await response.json();
        const parsed = parseTickersData(result.tickers);

        if (isMounted) {
          setNasdaqData(parsed);
          setBackendLoaded(true);
        }
      } catch (err) {
        console.error('Loading backend data failed', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Loading backend data failed.');
          setBackendLoaded(false);
        }
      }
    };

    loadBackendData();
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <div className="flex flex-col items-start justify-center px-6 py-6 sm:px-12 lg:py-8 w-full max-w-8xl mx-auto">
      <h1 className="w-full text-center text-5xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-7xl mb-8">
        sim-$tock
      </h1>

      {error && <p className="text-red-500 mb-4 w-full">Error: {error}</p>}

      {!backendLoaded && !error && (
        <p className="text-gray-500 mb-4 w-full">Initializing backend...</p>
      )}

      {backendLoaded && (
        <div className="w-full text-left">
          <TickerInput
            tickers={nasdaqData}
            tickerValue={tickerValue}
            onTickerChange={setTickerValue}
          />

          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            Current ticker (symbol): {tickerValue || 'none selected'}
          </p>
        </div>
      )}

    </div>
  );
}
