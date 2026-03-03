import { TickerDetails, TickerDetailsRaw } from "@/app/types/ticker";


export function parseTickerDetails(raw: TickerDetailsRaw): TickerDetails {
  try {
    if (raw.error) {
      throw new Error(raw.error);
    }

    if (!raw.history) {
      throw new Error('Missing history data');
    }

    const historyData = JSON.parse(raw.history);
    const firstKey = Object.keys(historyData)[0];
    const match = firstKey.match(/^\('([^']+)',\s*'([^']+)'\)$/);
    if (!match) {
      throw new Error('Invalid key format - no symbol found');
    }
    const [, , symbol] = match;

    const timeSeries = {
      Close: historyData[`('Close', '${symbol}')`] ?? {},
      High: historyData[`('High', '${symbol}')`] ?? {},
      Low: historyData[`('Low', '${symbol}')`] ?? {},
      Open: historyData[`('Open', '${symbol}')`] ?? {},
      Volume: historyData[`('Volume', '${symbol}')`] ?? {},
    };

    // Handle info data - safely handle null case
    const infoData = raw.info ?? {};

    return { 
      symbol, 
      timeSeries,
      info: infoData 
    };
  } catch (error) {
    console.error('Failed to parse ticker details:', error);
    throw new Error(`Invalid ticker details format: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
