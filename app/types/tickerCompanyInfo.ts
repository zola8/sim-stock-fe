export interface CompanyOfficer {
  maxAge: number;
  name: string;
  age?: number;
  title: string;
  yearBorn?: number;
  fiscalYear: number;
  totalPay?: number;
  exercisedValue?: number;
  unexercisedValue?: number;
}

export interface TickerCompanyInfo {
  symbol: string;
  shortName: string;
  longName: string;
  exchange: string;
  sector: string;
  industry: string;
  currency: string;

  // Price Data
  currentPrice: number;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  previousClose: number;
  regularMarketPreviousClose: number;
  open: number;
  dayLow: number;
  dayHigh: number;
  regularMarketOpen: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;

  // Market Stats
  marketCap: number;
  enterpriseValue: number;
  beta: number;
  averageVolume: number;
  averageVolume10days: number;
  volume: number;
  regularMarketVolume: number;
  fullTimeEmployees: number;

  // Financials
  profitMargins: number;
  operatingMargins: number;
  grossMargins: number;
  returnOnEquity: number;
  revenueGrowth: number;
  forwardPE: number;
  trailingPE: number;
  forwardEps: number;
  trailingEps: number;
  priceToBook: number;
  priceToSalesTrailing12Months: number;
  totalRevenue: number;
  totalCash: number;
  totalCashPerShare: number;
  totalDebt: number;
  debtToEquity: number;
  currentRatio: number;
  quickRatio: number;
  freeCashflow: number;
  operatingCashflow: number;

  // 52W & Averages
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  fiftyDayAverage: number;
  twoHundredDayAverage: number;
  trailingAnnualDividendRate: number;
  trailingAnnualDividendYield: number;

  // Analyst Data
  targetMeanPrice: number;
  targetMedianPrice: number;
  targetHighPrice: number;
  targetLowPrice: number;
  recommendationKey: string;
  numberOfAnalystOpinions: number;
  averageAnalystRating?: string;

  // Ownership
  heldPercentInsiders: number;
  heldPercentInstitutions: number;
  shortPercentOfFloat: number;

  // Risk Scores
  auditRisk: number;
  boardRisk: number;
  compensationRisk: number;
  shareHolderRightsRisk: number;
  overallRisk: number;

  // Company Info
  longBusinessSummary: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  fax?: string;
  website: string;

  // Executives
  companyOfficers: CompanyOfficer[];
}
