import { TickerDetailEntry } from "../types/ticker";
import { RecommendationsChart } from "./RecommendationsChart";


interface RecommendationsPanelProps {
  data?: TickerDetailEntry;
}


export function RecommendationsPanel({ data }: RecommendationsPanelProps) {
  const isEmpty = !data || Object.keys(data).length === 0;

  if (isEmpty) {
    return (
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-3 text-lg">Recommendations</h3>
        <p className="text-gray-500 text-sm">No recommendation data available.</p>
      </div>
    );
  }

  const periodKeys = Object.keys(data.period || {});
  const periods = periodKeys.map((key) => data.period?.[key] ?? key);
  const metrics = Object.keys(data).filter((key) => key !== "period");

  return (
    <div className="border rounded-lg p-4 bg-gray-50 overflow-x-auto">
      <h3 className="font-semibold mb-3 text-lg">Recommendations</h3>

      <div className="min-w-max">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-semibold">Recommendation</th>
              {periods.map((period, i) => (
                <th key={i} className="text-right p-2 font-semibold">
                  {period}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric} className="border-b hover:bg-gray-50">
                <td className="p-2 text-gray-700 font-medium capitalize">
                  {metric.replace(/([A-Z])/g, " $1")}
                </td>
                {periodKeys.map((periodKey) => (
                  <td key={periodKey} className="p-2 text-right font-medium">
                    {data[metric]?.[periodKey] ?? 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10">
          <RecommendationsChart data={data} />
        </div>

      </div>
    </div>
  );
}
