import { TickerDetails, TickerDetailsRaw } from "@/app/types/ticker";


export function parseTickerDetails(raw: TickerDetailsRaw): TickerDetails {
  if (!raw.history || !raw.info) {
    throw new Error('Missing info or history data');
  }

  const historyData = raw.history;
  const firstKey = Object.keys(historyData)[0];
  if (!firstKey) throw new Error('Empty history data');

  const symbol = firstKey.split(',')[1];

  const timeSeries = {
    Close: historyData[`Close,${symbol}`] ?? {},
    High: historyData[`High,${symbol}`] ?? {},
    Low: historyData[`Low,${symbol}`] ?? {},
    Open: historyData[`Open,${symbol}`] ?? {},
    Volume: historyData[`Volume,${symbol}`] ?? {},
  };

  const tryParseJSON = <T = Record<string, TickerDetailsRaw | null | undefined>>(
    text?: string
  ): T | undefined => {
    if (!text) return undefined;
    try {
      return JSON.parse(text) as T;
    } catch {
      console.warn('Could not parse JSON field');
      return undefined;
    }
  };

  return {
    symbol,
    timeSeries,
    info: raw.info,
    isin: raw.isin,
    income_stmt: tryParseJSON(raw.income_stmt),
    recommendations: tryParseJSON(raw.recommendations),
    revenue_estimate: tryParseJSON(raw.revenue_estimate),
  };
}
