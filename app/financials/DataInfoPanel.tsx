import { TickerDetailEntry } from "../types/ticker";
import { formatLargeNumber } from "../utils/formatters";


interface DataInfoPanelProps {
  data?: TickerDetailEntry;
  title: string;
}

export function DataInfoPanel({ data, title }: DataInfoPanelProps) {
  const isEmpty = !data || Object.keys(data).length === 0;

  if (isEmpty) {
    return (
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-3 text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">No financial data available.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-gray-50 overflow-x-auto">
      <h3 className="font-semibold mb-3 text-lg">{title} by Period</h3>
      {Object.entries(data).map(([timestamp, metrics]) => {
        const date = new Date(Number(timestamp)).toLocaleDateString();

        return (
          <div key={timestamp} className="mb-6">
            <div className="text-black font-bold mb-2">{date}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key}>
                  <p className="text-gray-500 break-words">{key}</p>
                  <p className="font-medium">
                    {formatLargeNumber(value || 0)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
