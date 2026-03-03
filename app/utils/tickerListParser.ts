import { RawTickerResponse, TickerListElement } from "@/app/types/ticker";


export function parseTickerList(raw: RawTickerResponse): TickerListElement[] {
  if (!raw || !raw.Symbol) return [];

  const indices = Object.keys(raw.Symbol);

  return indices.map((index) => {
    const ipoYear = raw.IPO_Year?.[index];
    const volume = raw.Volume?.[index];

    return {
      symbol: String(raw.Symbol[index] ?? ''),
      name: String(raw.Name[index] ?? ''),
      country: String(raw.Country[index] ?? ''),
      ipoYear: ipoYear != null ? String(ipoYear) : '',
      volume: Number(volume ?? 0),
      sector: String(raw.Sector[index] ?? ''),
      industry: String(raw.Industry[index] ?? ''),
    };
  });
}
