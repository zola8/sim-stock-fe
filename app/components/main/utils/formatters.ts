export const formatCurrency = (value?: number, currency = 'USD'): string => {
  if (value === undefined || isNaN(value)) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (value?: number): string => {
  if (value === undefined || isNaN(value)) return 'N/A';
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

export const formatPercent = (value?: number): string => {
  if (value === undefined || isNaN(value)) return 'N/A';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};
