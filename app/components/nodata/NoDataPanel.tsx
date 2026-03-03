import Link from 'next/link';
import React from 'react';


export function NoDataPanel() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center space-y-8 bg-background mt-6">
      <div className="w-24 h-24 mx-auto bg-secondary rounded-[var(--radius)] flex items-center justify-center shadow-sm"
        style={{ boxShadow: 'var(--shadow-sm)' }}>
        <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-card-foreground tracking-tight">
          No stock data available
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
          Select a stock ticker from the list or search bar to view detailed information, charts,
          and financial metrics.
        </p>
      </div>

      <div className="pt-4">
        <Link
          href="/"
          className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-[var(--radius)] hover:bg-opacity-90 transition-all shadow-md inline-flex items-center gap-2 group"
          style={{
            boxShadow: 'var(--shadow-md)',
            '--tw-ring-color': 'var(--ring)'
          } as React.CSSProperties}
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Navigate Back
        </Link>
      </div>
    </div>
  );
}
