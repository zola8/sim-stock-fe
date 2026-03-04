// ----- ticker list -----

import { TickerCompanyHistory } from "./tickerCompanyHistory";
import { TickerCompanyInfo } from "./tickerCompanyInfo";


export interface RawTickerResponse {
  Symbol: Record<string, string>;
  Name: Record<string, string>;
  Country: Record<string, string>;
  IPO_Year: Record<string, number | null>;
  Volume: Record<string, number | null>;
  Sector: Record<string, string>;
  Industry: Record<string, string>;
}


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


// ----- ticker details -----


export interface TickerDetailsRaw {
  history: TickerCompanyHistory | null;
  info: TickerCompanyInfo | null;
  isin?: string;
  income_stmt?: string;
  recommendations?: string;
  revenue_estimate?: string;
}


export interface TickerDetailRawEntry {
  [metric: string]: number | null;
}

export type TickerDetailEntry = Record<string, TickerDetailRawEntry>;


export interface TickerDetails {
  symbol: string;
  timeSeries: TickerCompanyHistory;
  info: TickerCompanyInfo | null;
  isin?: string;
  income_stmt?: TickerDetailEntry;
  recommendations?: TickerDetailEntry;
  revenue_estimate?: TickerDetailEntry;
}


// ----- ticker context -----

export interface TickerContextType {
  tickerData: TickerDetails | null;
  selectedTicker: string | null;
  setTickerData: (data: TickerDetails | null, ticker: string | null) => void;
}
