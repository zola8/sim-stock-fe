import { TickerCompanyInfo } from "../types/tickerCompanyInfo";
import { formatCurrency } from "../utils/formatters";


export function AnalystEstimates({ info }: { info: TickerCompanyInfo }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-semibold mb-3 text-lg">Analyst Estimates</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Target Price (Mean)</p>
          <p className="font-medium">{formatCurrency(info.targetMeanPrice, info.currency)}</p>
        </div>
        <div>
          <p className="text-gray-500">Target Price (Median)</p>
          <p className="font-medium">{formatCurrency(info.targetMedianPrice, info.currency)}</p>
        </div>
        <div>
          <p className="text-gray-500">Target Range</p>
          <p className="font-medium">
            {formatCurrency(info.targetLowPrice, info.currency)} - {formatCurrency(info.targetHighPrice, info.currency)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Analyst Rating</p>
          <p className="font-medium">{info.averageAnalystRating || info.recommendationKey?.toUpperCase() || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Number of Analysts</p>
          <p className="font-medium">{info.numberOfAnalystOpinions || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Short % of Float</p>
          <p className="font-medium">{info.shortPercentOfFloat ? `${(info.shortPercentOfFloat * 100).toFixed(2)}%` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Institutional Ownership</p>
          <p className="font-medium">{info.heldPercentInstitutions ? `${(info.heldPercentInstitutions * 100).toFixed(1)}%` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Insider Ownership</p>
          <p className="font-medium">{info.heldPercentInsiders ? `${(info.heldPercentInsiders * 100).toFixed(2)}%` : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
