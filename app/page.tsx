'use client';

import { JSX, useEffect, useState } from 'react';
import NavigationCard from './components/main/NavigationCard';
import SelectedTickerCard from './components/main/SelectedTickerCard';
import TickerInput from './components/main/ticker/TickerInput';
import { useTicker } from './contexts/TickerContext';
import { TickerListElement } from './types/ticker';
import { fetchTickerDetails, fetchTickerList } from './utils/backend_services';



export default function Home(): JSX.Element {
  const [backendLoaded, setBackendLoaded] = useState<boolean>(false);
  const [tickerList, setTickerList] = useState<TickerListElement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tickerValue, setTickerValue] = useState<string>('');
  const { setTickerData, selectedTicker } = useTicker();
  const [fetchingError, setFetchingError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async (): Promise<void> => {
      try {
        const parsedTickerList = await fetchTickerList();
        if (isMounted) {
          setTickerList(parsedTickerList);
          setBackendLoaded(true);
        }
      } catch (err) {
        console.error('Loading backend data failed', err);
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Loading backend data failed.'
          );
          setBackendLoaded(false);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);


  const handleGetTickerDetails = async (): Promise<void> => {
    if (!tickerValue.trim()) return;

    try {
      setLoading(true);
      setFetchingError(null)
      const response = await fetchTickerDetails(tickerValue);
      setTickerData(response, tickerValue.toUpperCase());
    } catch (e) {
      setTickerData(null, null);
      setFetchingError('Failed to fetch ticker info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-6 sm:px-12 lg:py-8 w-full max-w-7xl mx-auto">
      <h1 className="w-full text-center text-5xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-7xl mb-8">
        sim-$tock
      </h1>

      {error && <p className="text-red-500 mb-4 w-full text-center">Error: {error}</p>}

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

          <div className="w-full flex justify-center">
            <button
              onClick={handleGetTickerDetails}
              className="px-8 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] 
                         rounded-[var(--radius)] font-medium hover:opacity-80 transition-all 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[300px]"
              disabled={!tickerValue.trim() || loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-[var(--primary-foreground)] border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                'Get info'
              )}
            </button>
          </div>

          {selectedTicker && (
            <div>
              <SelectedTickerCard selectedTicker={selectedTicker} />
              <NavigationCard />
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
