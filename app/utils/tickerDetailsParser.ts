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

  const tryParseJSON = (text?: string): Record<string, unknown> | undefined => {
    if (!text) return;
    try {
      return JSON.parse(text);
    } catch {
      console.warn('Could not parse JSON field');
      return;
    }
  };

  return {
    symbol,
    timeSeries,
    info: raw.info,
    isin: raw.isin,
    financials: tryParseJSON(raw.financials),
    income_stmt: tryParseJSON(raw.income_stmt),
    recommendations: tryParseJSON(raw.recommendations),
    revenue_estimate: tryParseJSON(raw.revenue_estimate),
  };
}
