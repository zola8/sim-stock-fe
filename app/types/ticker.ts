// ----- ticker list -----

import { StockCompanyInfo } from "./stockCompany";

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
  history: string | null;
  info: StockCompanyInfo | null;
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
  info: StockCompanyInfo | null;
}


// ----- ticker context -----

export interface TickerContextType {
  tickerData: TickerDetails | null;
  selectedTicker: string;
  setTickerData: (data: TickerDetails | null, ticker: string) => void;
}

