export const formatCurrency = (value?: number, currency = 'USD'): string => {
  if (value === undefined || isNaN(value)) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercent = (value?: number): string => {
  if (value === undefined || isNaN(value)) return 'N/A';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatLargeNumber = (value: number | undefined): string => {
  if (value === undefined) return 'N/A';
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};
