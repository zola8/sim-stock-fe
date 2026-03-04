import { TickerDetailEntry } from "../types/ticker";
import { formatLargeNumber } from "../utils/formatters";

interface RevenueEstimatePanelProps {
  data?: TickerDetailEntry;
}


export function RevenueEstimatePanel({ data }: RevenueEstimatePanelProps) {
  const isEmpty = !data || Object.keys(data).length === 0;

  if (isEmpty) {
    return (
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-3 text-lg">Revenue Estimate</h3>
        <p className="text-gray-500 text-sm">No revenue estimate data available.</p>
      </div>
    );
  }

  const metrics = Object.keys(data);
  const periods = Object.keys(data[metrics[0]] || {});

  return (
    <div className="border rounded-lg p-4 bg-gray-50 overflow-x-auto">
      <h3 className="font-semibold mb-3 text-lg">Revenue Estimate</h3>

      <div className="min-w-max">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-semibold">Metric</th>
              {periods.map((period) => (
                <th key={period} className="text-right p-2 font-semibold">
                  {period}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {metrics.map((metric) => (
              <tr key={metric} className="border-b hover:bg-gray-50">
                <td className="p-2 text-gray-700 font-medium">{metric}</td>
                {periods.map((period) => {
                  const rawValue = data[metric]?.[period] ?? null;
                  const value =
                    metric === "growth"
                      ? `${((rawValue ?? 0) * 100).toFixed(2)}%`
                      : formatLargeNumber(rawValue ?? 0);

                  return (
                    <td key={period} className="p-2 text-right font-medium">
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
