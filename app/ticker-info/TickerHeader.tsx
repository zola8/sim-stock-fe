import { TickerCompanyInfo } from "../types/tickerCompanyInfo";
import { formatCurrency, formatPercent } from "../utils/formatters";


interface TickerHeaderProps {
  info: TickerCompanyInfo;
  isin: string;
}


export function TickerHeader({ info, isin }: TickerHeaderProps) {
  const priceChange = info?.regularMarketChange;
  const priceChangePercent = info?.regularMarketChangePercent;
  const isPositive = priceChange !== undefined && priceChange >= 0;

  return (
    <div className="border-b pb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{info.longName || info.shortName}</h1>
          <p className="text-gray-500">
            {info.symbol} • {info.exchange} • {info.sector} / {info.industry}
          </p>
          {isin && (
            <p className="text-xs text-gray-400 mt-1">ISIN: {isin}</p>
          )}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">
            {formatCurrency(info.currentPrice || info.regularMarketPrice, info.currency)}
          </div>
          {priceChange !== undefined && (
            <div
              className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              {formatCurrency(priceChange, info.currency)} ({formatPercent(priceChangePercent)})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

