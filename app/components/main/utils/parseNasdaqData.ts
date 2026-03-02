import { NasdaqEntry, NasdaqScreenerData } from '../types';

export function parseTickersData(jsonString: string): NasdaqEntry[] {
  try {
    const parsed: NasdaqScreenerData = JSON.parse(jsonString);

    const entries: NasdaqEntry[] = Object.keys(parsed.Symbol).map((key) => {
      const index = Number(key);
      return {
        Symbol: parsed.Symbol[index],
        Name: parsed.Name[index],
        Country: parsed.Country[index],
        IPO_Year: parsed["IPO Year"][index],
        Volume: parsed.Volume[index],
        Sector: parsed.Sector[index],
        Industry: parsed.Industry[index],
      };
    });

    return entries;
  } catch (err) {
    console.error('Failed to parse NASDAQ data:', err);
    return [];
  }
}
