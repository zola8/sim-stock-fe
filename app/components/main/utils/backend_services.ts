import { API_CONFIG } from '@/next.config';
import { BackendResponse, NasdaqEntry } from '../types';
import { parseTickersData } from './parseNasdaqData';


const CACHE_CONFIG = {
  TICKERS: 24 * 60 * 60 * 1000, // 24 hours
  TICKER_INFO: 4 * 60 * 60 * 1000, // 4 hours
} as const;


const STORAGE_KEYS = {
  TICKERS: 'ss_tickers_v1',
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
export async function fetchTickers(): Promise<NasdaqEntry[]> {
  const key = STORAGE_KEYS.TICKERS;
  const cached = getCachedData(key, CACHE_CONFIG.TICKERS);

  if (cached !== null) {
    return cached;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}/ticker-list`);

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const result: BackendResponse = await response.json();
  const parsed = parseTickersData(result.tickers);

  setCachedData(key, parsed, CACHE_CONFIG.TICKERS);
  return parsed;
}


/**
 * Fetch ticker info with cache
 */
export async function fetchTickerInfo(ticker_id: string): Promise<any> {
  const key = STORAGE_KEYS.TICKER_INFO(ticker_id);
  const ttl = CACHE_CONFIG.TICKER_INFO;

  const cached = getCachedData(key, ttl);
  if (cached !== null) {
    return cached;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}/fetch/ticker/${ticker_id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ticker info for ${ticker_id}: HTTP ${response.status}`);
  }

  const data = await response.json();
  setCachedData(key, data, ttl);
  return data;
}


/**
 * Invalidate specific cache
 */
export function invalidateCache(type: 'TICKERS' | 'TICKER_INFO', ticker?: string): void {
  if (type === 'TICKERS') {
    localStorage.removeItem(STORAGE_KEYS.TICKERS);
  } else if (ticker) {
    localStorage.removeItem(STORAGE_KEYS.TICKER_INFO(ticker));
  }
}


/**
 * Clear ALL caches
 */
export function clearAllCaches(): void {
  localStorage.removeItem(STORAGE_KEYS.TICKERS);
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('ticker_info_')) {
      localStorage.removeItem(key);
    }
  });
  console.log('All caches cleared');
}

