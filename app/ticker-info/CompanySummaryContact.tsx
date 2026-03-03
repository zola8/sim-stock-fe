import { TickerCompanyInfo } from "../types/tickerCompanyInfo";
import { formatCurrency } from "../utils/formatters";


export function CompanySummaryContact({ info }: { info: TickerCompanyInfo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {info.longBusinessSummary && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">About {info.shortName}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{info.longBusinessSummary}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Headquarters:</span> {info.address1}, {info.address2 && `${info.address2}, `}
              {info.city}, {info.state} {info.zip}, {info.country}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {info.phone}
            </p>
            {info.fax && (
              <p>
                <span className="font-medium">Fax:</span> {info.fax}
              </p>
            )}
            {info.website && (
              <p>
                <span className="font-medium">Website:</span>{' '}
                <a
                  href={info.website.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {info.website.trim()}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Market Data</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Previous Close:</span>{' '}
              {formatCurrency(info.previousClose || info.regularMarketPreviousClose, info.currency)}
            </p>
            <p>
              <span className="font-medium">Day Range:</span>{' '}
              {info.dayLow?.toFixed(2)} - {info.dayHigh?.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">50-Day Avg:</span>{' '}
              {formatCurrency(info.fiftyDayAverage, info.currency)}
            </p>
            <p>
              <span className="font-medium">200-Day Avg:</span>{' '}
              {formatCurrency(info.twoHundredDayAverage, info.currency)}
            </p>
            <p>
              <span className="font-medium">Dividend Yield:</span>{' '}
              {info.trailingAnnualDividendYield ? `${(info.trailingAnnualDividendYield * 100).toFixed(2)}%` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
