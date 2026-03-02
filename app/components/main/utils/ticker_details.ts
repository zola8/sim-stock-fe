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


export function parseTickerDetails(raw: string): TickerDetails {
  try {
    const nestedData = JSON.parse(raw);
    console.log('---', nestedData)

    const firstKey = Object.keys(nestedData)[0];
    const [, , symbol] = firstKey.match(/^\('([^']+)',\s*'([^']+)'\)$/)!;

    const timeSeries = {
      Close: nestedData[`('Close', '${symbol}')`] ?? {},
      High: nestedData[`('High', '${symbol}')`] ?? {},
      Low: nestedData[`('Low', '${symbol}')`] ?? {},
      Open: nestedData[`('Open', '${symbol}')`] ?? {},
      Volume: nestedData[`('Volume', '${symbol}')`] ?? {},
    };

    return { symbol, timeSeries };
  } catch (error) {
    console.error('Failed to parse ticker details:', error);
    throw new Error('Invalid ticker details format');
  }
}
