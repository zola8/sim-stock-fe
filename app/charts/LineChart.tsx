"use client"

import {
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoryTimeSeries } from '../types/ticker';



function transformTimeSeriesToChartData(
  timeSeries: HistoryTimeSeries,
  metricsToShow: string[] = ['Close'],
  colors: Record<string, { border: string; background: string }> = {
    Close: { border: 'rgb(53, 162, 235)', background: 'rgba(53, 162, 235, 0.5)' },
    Open: { border: 'rgb(255, 99, 132)', background: 'rgba(255, 99, 132, 0.5)' },
    High: { border: 'rgb(75, 192, 192)', background: 'rgba(75, 192, 192, 0.5)' },
    Low: { border: 'rgb(255, 206, 86)', background: 'rgba(255, 206, 86, 0.5)' },
    Volume: { border: 'rgb(153, 102, 255)', background: 'rgba(153, 102, 255, 0.5)' },
  }
): ChartData<'line'> {
  const firstMetricKey = Object.keys(timeSeries)[0];
  if (!firstMetricKey) return { labels: [], datasets: [] };

  const dates = Object.keys(timeSeries[firstMetricKey]).sort();

  const datasets = metricsToShow
    .filter(metric => timeSeries[metric])
    .map(metric => {
      const color = colors[metric] || {
        border: 'rgb(75, 85, 99)',
        background: 'rgba(75, 85, 99, 0.5)'
      };

      return {
        label: metric,
        data: dates.map(date => timeSeries[metric][date]),
        borderColor: color.border,
        backgroundColor: color.background,
        tension: 0.3,
        fill: false,
      };
    });

  return {
    labels: dates,
    datasets,
  };
}

interface LineChartPageProps {
  history: HistoryTimeSeries;
  currency?: string;
}

export default function LineChartPage({ history, currency = 'USD' }: LineChartPageProps) {

  const chartRef = useRef<Chart | null>(null);

  const resetZoom = useCallback(() => {
    if (chartRef.current) {
      chartRef.current.resetZoom('none');
    }
  }, []);

  useEffect(() => {
    let registered = false;
    if (typeof window !== 'undefined') {
      import('chartjs-plugin-zoom').then((zoomPlugin) => {
        if (!registered) {
          ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend,
            BarElement,
            zoomPlugin.default
          );
          registered = true;
        }
      });
    }
    return () => {
      registered = false;
    };
  }, []);


  const availableMetrics = useMemo(() => {
    return Object.keys(history).filter(key =>
      key === 'Open' || key === 'High' || key === 'Low' ||
      key === 'Close' || key === 'Volume'
    );
  }, [history]);

  const [metricsToShow, setMetricsToShow] = useState<string[]>(['Close']);

  const chartData = useMemo(() =>
    transformTimeSeriesToChartData(history, metricsToShow),
    [history, metricsToShow]
  );


  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        onClick: (e, legendItem, legend) => {
          if (legendItem.datasetIndex === undefined || legendItem.datasetIndex < 0) {
            return;
          }

          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          if (ci.isDatasetVisible(index)) {
            ci.hide(index);
            legendItem.hidden = true;
          } else {
            ci.show(index);
            legendItem.hidden = false;
          }
        },
      },
      title: {
        display: true,
        text: 'Stock Price History',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const symbol = currency === 'USD' ? '$' : '€';

            if (label === 'Volume') {
              return `${label}: ${Number(value).toLocaleString()}`;
            }
            return `${label}: ${symbol}${Number(value).toFixed(2)}`;
          }
        }
      },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          mode: 'xy',
        },
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => {
            const symbol = currency === 'USD' ? '$' : '€';
            return `${symbol}${Number(value).toFixed(2)}`;
          }
        },
        title: {
          display: true,
          text: 'Price'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };



  return (
    <div className="p-4 w-full max-w-4xl mx-auto">

      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">

        <div className="flex flex-wrap gap-2 flex-1">
          {availableMetrics.map(metric => (
            <label key={metric} className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={metricsToShow.includes(metric)}
                onChange={(e) => {
                  setMetricsToShow(prev =>
                    e.target.checked
                      ? [...prev, metric]
                      : prev.filter(m => m !== metric)
                  );
                }}
                className="rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm font-medium">{metric}</span>
            </label>
          ))}
        </div>

        <button
          onClick={resetZoom}
          className={`px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all duration-200 ${chartRef.current
            ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md'
            : 'bg-gray-200 text-gray-500'
            }`}
        >
          🔄 Reset Zoom
        </button>

      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
        <div className="h-[400px] md:h-[500px] relative">
          <Line
            ref={chartRef}
            options={options}
            data={chartData}
          />
        </div>
      </div>

    </div>
  );
}

