'use client';

import { useEffect, useState } from "react";
import TickerInput from "./components/main/ticker/TickerInput";
import { fetchTickerDetails, fetchTickerList } from "./components/main/utils/backend_services";
import { useTicker } from "./contexts/TickerContext";
import { TickerListElement } from "./types/ticker";


export default function Home() {

  const [backendLoaded, setBackendLoaded] = useState(false);
  const [tickerList, setTickerList] = useState<TickerListElement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tickerValue, setTickerValue] = useState<string>(''); // current input
  const { setTickerData, selectedTicker } = useTicker();
  const [fetchingError, setFetchingError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const parsedTickerList = await fetchTickerList();
        if (isMounted) {
          setTickerList(parsedTickerList);
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


  const handleGetTickerDetails = async () => {
    try {
      setFetchingError(null)
      const response = await fetchTickerDetails(tickerValue);
      setTickerData(response, tickerValue);
    } catch (e) {
      setTickerData(null, null);
      setFetchingError('Invalid or wrong ticket symbol. Cannot fetch data.')
    }
  };


  return (
    <div className="flex flex-col items-center justify-center px-6 py-6 sm:px-12 lg:py-8 w-full max-w-7xl mx-auto">
      <h1 className="w-full text-center text-5xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-7xl mb-8">
        sim-$tock
      </h1>

      {error && (
        <p className="text-red-500 mb-4 w-full text-center">Error: {error}</p>
      )}

      {!backendLoaded && !error && (
        <p className="text-gray-500 mb-4 w-full text-center">Initializing backend...</p>
      )}

      {backendLoaded && (
        <div className="w-full space-y-6">
          <TickerInput
            tickers={tickerList}
            tickerValue={tickerValue}
            onTickerChange={setTickerValue}
          />

          <div className="w-full max-w-md mx-auto">
            <button
              onClick={handleGetTickerDetails}
              className="w-full px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)] font-medium hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!tickerValue.trim()}
            >
              Get info
            </button>
          </div>

          {selectedTicker && (
            <div className="text-center space-y-2 pt-12">
              <p className="text-sm text-[var(--muted-foreground)]">
                Current ticker is <strong>{selectedTicker}</strong>
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Pages available in top-right navigation dropdown.
              </p>
            </div>
          )}

          {fetchingError && (
            <p className="text-red-500 mb-4 w-full text-center">{fetchingError}</p>
          )}
        </div>
      )}
    </div>
  );

}
