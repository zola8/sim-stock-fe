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
  financials?: string;
  income_stmt?: string;
  recommendations?: string;
  revenue_estimate?: string;
}


export interface TickerDetails {
  symbol: string;
  timeSeries: TickerCompanyHistory;
  info: TickerCompanyInfo | null;
  isin?: string;
  financials?: Record<string, unknown>;
  income_stmt?: Record<string, unknown>;
  recommendations?: Record<string, unknown>;
  revenue_estimate?: Record<string, unknown>;
}


// ----- ticker context -----

export interface TickerContextType {
  tickerData: TickerDetails | null;
  selectedTicker: string | null;
  setTickerData: (data: TickerDetails | null, ticker: string | null) => void;
}
