import { TickerCompanyInfo } from "../types/tickerCompanyInfo";
import { formatLargeNumber } from "../utils/formatters";


export function FinancialHighlights({ info }: { info: TickerCompanyInfo }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-semibold mb-3 text-lg">Financial Highlights</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Revenue (TTM)</p>
          <p className="font-medium">{formatLargeNumber(info.totalRevenue)}</p>
        </div>
        <div>
          <p className="text-gray-500">Profit Margin</p>
          <p className="font-medium">{info.profitMargins ? `${(info.profitMargins * 100).toFixed(2)}%` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Operating Margin</p>
          <p className="font-medium">{info.operatingMargins ? `${(info.operatingMargins * 100).toFixed(2)}%` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">ROE</p>
          <p className="font-medium">{info.returnOnEquity ? `${(info.returnOnEquity * 100).toFixed(2)}%` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Revenue Growth</p>
          <p className="font-medium">{info.revenueGrowth ? `${(info.revenueGrowth * 100).toFixed(2)}%` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">EPS (Forward)</p>
          <p className="font-medium">{info.forwardEps?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Price/Book</p>
          <p className="font-medium">{info.priceToBook?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Price/Sales</p>
          <p className="font-medium">{info.priceToSalesTrailing12Months?.toFixed(2) || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
