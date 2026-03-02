export interface TickerDetailsRaw {
  data: string;
  error: string | null;
}


export interface TickerDetails {
  symbol: string;
  timeSeries: {
    Close: Record<string, number>;
    High: Record<string, number>;
    Low: Record<string, number>;
    Open: Record<string, number>;
    Volume: Record<string, number>;
  };
}


export function parseTickerDetails(raw: TickerDetailsRaw): TickerDetails {
  try {
    if (raw.error) {
      throw new Error(raw.error);
    }

    const innerData = JSON.parse(raw.data);
    const firstKey = Object.keys(innerData)[0];
    const match = firstKey.match(/^\('([^']+)',\s*'([^']+)'\)$/);
    if (!match) {
      throw new Error('Invalid key format - no symbol found');
    }
    const [, , symbol] = match;

    const timeSeries = {
      Close: innerData[`('Close', '${symbol}')`] ?? {},
      High: innerData[`('High', '${symbol}')`] ?? {},
      Low: innerData[`('Low', '${symbol}')`] ?? {},
      Open: innerData[`('Open', '${symbol}')`] ?? {},
      Volume: innerData[`('Volume', '${symbol}')`] ?? {},
    };

    return { symbol, timeSeries };
  } catch (error) {
    console.error('Failed to parse ticker details:', error);
    throw new Error(`Invalid ticker details format: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
