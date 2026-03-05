import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { TickerDetailEntry } from '../types/ticker';


export interface RecommendationsData {
  period: Record<string, string>;
  strongBuy: Record<string, number>;
  buy: Record<string, number>;
  hold: Record<string, number>;
  sell: Record<string, number>;
  strongSell: Record<string, number>;
}

interface RecommendationsChartProps {
  data?: TickerDetailEntry;
}


export function RecommendationsChart({ data }: RecommendationsChartProps) {
  const chartData = useMemo(() => {
    if (!data) return { labels: [], datasets: [] };

    const periods = Object.values(data.period);
    const categories = ['strongBuy', 'buy', 'hold', 'sell', 'strongSell'];

    const datasets = categories.map((category, i) => {
      const values = Object.values(data[category as keyof RecommendationsData] as Record<string, number>);

      return {
        label: category,
        data: values,
        backgroundColor: getCategoryColor(i),
        borderWidth: 0,
      };
    });

    return { labels: periods, datasets };
  }, [data]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Analyst Recommendations Over Time',
        font: { size: 16 },
      },
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Period',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Recommendations',
        },
        stacked: true,
      },
    },
    interaction: {
      intersect: false,
    },
  }), []);

  if (!data) return <p>No recommendations data available.</p>;

  return (
    <div className='mx-auto w-9/10 h-96 md:h-[500px] p-4 border rounded-lg'>
      <Bar data={chartData} options={options} />
    </div>
  );
}


const getCategoryColor = (index: number): string => {
  const colors = [
    'rgba(0, 150, 0, 0.8)',    // strongBuy (dark green)
    'rgba(100, 200, 100, 0.8)', // buy (light green)
    'rgba(255, 200, 0, 0.8)',  // hold (yellow)
    'rgba(200, 100, 100, 0.8)', // sell (light red)
    'rgba(150, 0, 0, 0.8)',    // strongSell (dark red)
  ];
  return colors[index] || 'rgba(128, 128, 128, 0.8)';
};
