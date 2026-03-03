import { TickerListElement } from "@/app/types/ticker";


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
