import { TickerCompanyInfo } from "../types/tickerCompanyInfo";
import { formatLargeNumber } from "../utils/formatters";
import { StatCard } from "./StatCard";


export function PrimaryStats({ info }: { info: TickerCompanyInfo }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Market Cap" value={formatLargeNumber(info.marketCap)} />
      <StatCard label="Enterprise Value" value={formatLargeNumber(info.enterpriseValue)} />
      <StatCard label="P/E Ratio (Fwd)" value={info.forwardPE?.toFixed(2) || 'N/A'} />
      <StatCard label="P/E Ratio (Trailing)" value={info.trailingPE?.toFixed(2) || 'N/A'} />
      <StatCard
        label="52W Range"
        value={`${info.fiftyTwoWeekLow?.toFixed(2) || 'N/A'} - ${info.fiftyTwoWeekHigh?.toFixed(2) || 'N/A'}`}
      />
      <StatCard label="Beta" value={info.beta?.toFixed(2) || 'N/A'} />
      <StatCard label="Avg Volume" value={info.averageVolume?.toLocaleString() || 'N/A'} />
      <StatCard label="Employees" value={info.fullTimeEmployees?.toLocaleString() || 'N/A'} />
    </div>
  );
}
