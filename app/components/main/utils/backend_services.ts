import { API_CONFIG } from "@/next.config";
import { parseTickerList, TickerListApiResponse, TickerListElement } from "./ticker_list";
import { parseTickerDetails, TickerDetails, TickerDetailsRaw } from "./ticker_details";

const CACHE_CONFIG = {
  TICKER_LIST: 24 * 60 * 60 * 1000, // 24 hours
  TICKER_INFO: 4 * 60 * 60 * 1000, // 4 hours
} as const;


const STORAGE_KEYS = {
  TICKER_LIST: 'ss_ticker_list',
  TICKER_INFO: (ticker: string) => `ss_ticker_info_${ticker}`,
} as const;



/**
 * Get cached data
 */
function getCachedData(key: string, ttl: number): any | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { data, expiry } = JSON.parse(item);

    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}


/**
 * Cache data with configurable TTL
 */
function setCachedData(key: string, data: any, ttl: number): void {
  try {
    const expiry = Date.now() + ttl;
    localStorage.setItem(key, JSON.stringify({
      data,
      expiry
    }));
  } catch (e) {
    console.warn('Failed to cache data:', e);
  }
}


/**
 * Fetch tickers with cache
 */
export async function fetchTickerList(): Promise<TickerListElement[]> {
  const key = STORAGE_KEYS.TICKER_LIST;
  const cached = getCachedData(key, CACHE_CONFIG.TICKER_LIST);

  if (cached !== null) return cached;

  const response = await fetch(`${API_CONFIG.BASE_URL}/ticker-list`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const rawResult = await response.json();
  const parsedResult = parseTickerList(rawResult);

  setCachedData(key, parsedResult, CACHE_CONFIG.TICKER_LIST);
  return parsedResult;
}



/**
 * Fetch ticker info with cache
 */
export async function fetchTickerDetails(ticker_id: string): Promise<TickerDetails> {
  const key = STORAGE_KEYS.TICKER_INFO(ticker_id);
  const ttl = CACHE_CONFIG.TICKER_INFO;

  const cached = getCachedData(key, ttl);
  if (cached !== null) {
    return cached;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}/fetch/ticker/${ticker_id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ticker details for ${ticker_id}: HTTP ${response.status}`);
  }

  const rawResult = await response.json();
  const parsedResult = parseTickerDetails(rawResult);

  setCachedData(key, parsedResult, ttl);
  return parsedResult;
}



/**
 * Invalidate specific cache
 */
export function invalidateCache(type: 'TICKER_LIST' | 'TICKER_INFO', ticker?: string): void {
  if (type === 'TICKER_LIST') {
    localStorage.removeItem(STORAGE_KEYS.TICKER_LIST);
  } else if (ticker) {
    localStorage.removeItem(STORAGE_KEYS.TICKER_INFO(ticker));
  }
}


/**
 * Clear ALL caches
 */
export function clearAllCaches(): void {
  localStorage.removeItem(STORAGE_KEYS.TICKER_LIST);
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('ss_ticker_info_')) {
      localStorage.removeItem(key);
    }
  });
  console.log('All caches cleared');
}

