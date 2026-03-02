export interface TickerListElement {
  symbol: string;
  name: string;
  country: string;
  ipoYear: string;
  volume: number;
  sector: string;
  industry: string;
}


export interface TickerListApiResponse {
  Symbol: Record<string, string>;
  Name: Record<string, string>;
  Country: Record<string, string>;
  IPO_Year: Record<string, string>;
  Volume: Record<string, number>;
  Sector: Record<string, string>;
  Industry: Record<string, string>;
}


export function parseTickerList(raw: string): TickerListElement[] {
  let data: any;

  try {
    data = JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse raw string:", error);
    return [];
  }

  if (!data || !data.Symbol) return [];

  const indices = Object.keys(data.Symbol);

  return indices.map((index) => {
    return {
      symbol: String(data.Symbol[index] || ''),
      name: String(data.Name[index] || ''),
      country: String(data.Country[index] || ''),
      ipoYear: String(data.IPO_Year[index] || ''),
      volume: Number(data.Volume[index] || 0),
      sector: String(data.Sector[index] || ''),
      industry: String(data.Industry[index] || ''),
    };
  });
}
