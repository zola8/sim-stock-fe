'use client';

import { useEffect, useState } from 'react';
import TickerInput from './ticker/TickerInput';
import { NasdaqEntry } from './types';
import { fetchTickerInfo, fetchTickers } from './utils/backend_services';


export default function Dashboard() {
  const [backendLoaded, setBackendLoaded] = useState(false);
  const [nasdaqData, setNasdaqData] = useState<NasdaqEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tickerValue, setTickerValue] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const parsed = await fetchTickers();
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

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);


  const handleGetTickerInfo = async () => {
    try {
      const data = await fetchTickerInfo(tickerValue);
      // TODO convert, link, chart...
    } catch (e) {
      console.error('Failed to fetch ticker info', e);
    }
  };


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

          <div className="w-full max-w-2xl mx-auto px-6">
            <button
              onClick={handleGetTickerInfo}
              className="w-full px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)] font-medium hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!tickerValue.trim()}
            >
              Get info
            </button>
          </div>

          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            Current ticker (symbol): {tickerValue || 'none selected'}
          </p>
        </div>
      )}
    </div>
  );
}
