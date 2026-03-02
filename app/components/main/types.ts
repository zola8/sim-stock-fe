export interface NasdaqEntry {
  Symbol: string;
  Name: string;
  Country: string;
  IPO_Year: number;
  Volume: number;
  Sector: string;
  Industry: string;
}

export interface NasdaqScreenerData {
  Symbol: Record<number, string>;
  Name: Record<number, string>;
  Country: Record<number, string>;
  "IPO Year": Record<number, number>;
  Volume: Record<number, number>;
  Sector: Record<number, string>;
  Industry: Record<number, string>;
}

export interface BackendResponse {
  tickers: string;
}
