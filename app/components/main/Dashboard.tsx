'use client';

import { useState, useEffect } from 'react';
import TrackerInput from './tracker/TrackerInput';
import { API_CONFIG } from '@/next.config';
import { NasdaqEntry, BackendResponse } from './types';
import { parseNasdaqData } from './utils/parseNasdaqData';

export default function Dashboard() {
  const [backendLoaded, setBackendLoaded] = useState(false);
  const [nasdaqData, setNasdaqData] = useState<NasdaqEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadBackendData = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INITIAL_DATA}`);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        const result: BackendResponse = await response.json();
        const parsed = parseNasdaqData(result.nasdaq_screener);

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
          <TrackerInput nasdaqData={nasdaqData} />
        </div>
      )}
    </div>
  );
}
