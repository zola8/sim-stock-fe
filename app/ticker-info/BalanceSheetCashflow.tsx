import { TickerCompanyInfo } from "../types/tickerCompanyInfo";
import { formatCurrency, formatLargeNumber } from "../utils/formatters";


export function BalanceSheetCashflow({ info }: { info: TickerCompanyInfo }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-semibold mb-3 text-lg">Balance Sheet & Cash Flow</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Total Cash</p>
          <p className="font-medium">{formatLargeNumber(info.totalCash)}</p>
        </div>
        <div>
          <p className="text-gray-500">Total Debt</p>
          <p className="font-medium">{formatLargeNumber(info.totalDebt)}</p>
        </div>
        <div>
          <p className="text-gray-500">Debt/Equity</p>
          <p className="font-medium">{info.debtToEquity?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Current Ratio</p>
          <p className="font-medium">{info.currentRatio?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Quick Ratio</p>
          <p className="font-medium">{info.quickRatio?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Free Cash Flow</p>
          <p className="font-medium">{formatLargeNumber(info.freeCashflow)}</p>
        </div>
        <div>
          <p className="text-gray-500">Operating Cash Flow</p>
          <p className="font-medium">{formatLargeNumber(info.operatingCashflow)}</p>
        </div>
        <div>
          <p className="text-gray-500">Cash/Share</p>
          <p className="font-medium">{formatCurrency(info.totalCashPerShare, info.currency)}</p>
        </div>
      </div>
    </div>
  );
}
