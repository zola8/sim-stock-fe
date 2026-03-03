"use client"

import { JSX } from "react";
import { NoDataPanel } from "../components/nodata/NoDataPanel";
import { useTicker } from "../contexts/TickerContext";
import { StockCompanyInfo } from "../types/tickerCompanyInfo";
import { StatCard } from "./StatCard";
import { formatCurrency, formatPercent, formatNumber } from "../utils/formatters";


export default function TickerInfoPage(): JSX.Element {
  const { tickerData } = useTicker();

  if (!tickerData?.info) {
    return <NoDataPanel />;
  }

  const info: StockCompanyInfo = tickerData.info;
  const timeSeries = tickerData.timeSeries;
  const latestClose = timeSeries?.Close
    ? timeSeries.Close[Object.keys(timeSeries.Close)[0]]
    : info?.regularMarketPrice;
  const priceChange = info?.regularMarketChange;
  const priceChangePercent = info?.regularMarketChangePercent;
  const isPositive = priceChange !== undefined && priceChange >= 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="border-b pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{info.longName || info.shortName}</h1>
            <p className="text-gray-500">
              {info.symbol} • {info.exchange} • {info.sector} / {info.industry}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {formatCurrency(info.currentPrice || info.regularMarketPrice, info.currency)}
            </div>
            {priceChange !== undefined && (
              <div
                className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
              >
                {formatCurrency(priceChange, info.currency)} ({formatPercent(priceChangePercent)})
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Market Cap" value={formatNumber(info.marketCap)} />
        <StatCard label="P/E Ratio (Fwd)" value={info.forwardPE?.toFixed(2) || 'N/A'} />
        <StatCard
          label="52W Range"
          value={`${info.fiftyTwoWeekLow?.toFixed(2) || 'N/A'} - ${info.fiftyTwoWeekHigh?.toFixed(2) || 'N/A'
            }`}
        />
        <StatCard label="Beta" value={info.beta?.toFixed(2) || 'N/A'} />
        <StatCard label="Avg Volume" value={info.averageVolume?.toLocaleString() || 'N/A'} />
        <StatCard label="Employees" value={info.fullTimeEmployees?.toLocaleString() || 'N/A'} />
        <StatCard
          label="Profit Margin"
          value={info.profitMargins ? `${(info.profitMargins * 100).toFixed(2)}%` : 'N/A'}
        />
        <StatCard label="Analyst Recommendation" value={info.recommendationKey?.toUpperCase() || 'N/A'} />
      </div>

      {info.longBusinessSummary && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">About {info.shortName}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{info.longBusinessSummary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pb-4 border-b">
        <div className="space-y-1">
          <p>
            <span className="font-medium">Headquarters:</span> {info.address1}, {info.city},{' '}
            {info.state} {info.zip}, {info.country}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {info.phone}
          </p>
          {info.website && (
            <p>
              <span className="font-medium">Website:</span>{' '}
              <a
                href={info.website.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {info.website.trim()}
              </a>
            </p>
          )}
        </div>
        <div className="space-y-1">
          <p>
            <span className="font-medium">Latest Close:</span>{' '}
            {formatCurrency(latestClose, info.currency)}
          </p>
          <p>
            <span className="font-medium">Target Price (Mean):</span>{' '}
            {formatCurrency(info.targetMeanPrice, info.currency)}
          </p>
          <p>
            <span className="font-medium">Analysts:</span> {info.numberOfAnalystOpinions} opinions
          </p>
        </div>
      </div>

    </div>
  );
}
