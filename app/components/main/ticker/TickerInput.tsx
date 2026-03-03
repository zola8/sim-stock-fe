'use client';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { HelpModal } from './HelpModal';
import { TickerListElement } from '../utils/tickerListParser';


interface TickerInputProps {
  tickers: TickerListElement[];
  tickerValue: string;
  onTickerChange: (v: string) => void;
}


export default function TickerInput({ tickers, tickerValue, onTickerChange }: TickerInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onTickerChange(e.target.value || '');
  };

  const handleHelpClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-start gap-3">

        <div className="flex-1">
          <label
            htmlFor="tracker-input"
            className="block text-sm font-medium text-[var(--foreground)] mb-2"
          >
            Symbol / Ticker
          </label>
          <input
            id="tracker-input"
            name="tracker"
            type="text"
            maxLength={10}
            value={tickerValue}
            onChange={handleInputChange}
            placeholder="Enter your symbol..."
            className={`w-full px-4 py-3 bg-[var(--input)] text-[var(--foreground)] rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] placeholder:text-[var(--muted-foreground)] transition-all`}
          />
        </div>

        <div className="mt-[28px]">
          <button
            type="button"
            onClick={handleHelpClick}
            className="p-3 bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-[var(--radius)] hover:bg-[var(--accent)] transition-colors border border-[var(--border)] flex items-center justify-center"
            aria-label="Help"
            title="Help"
          >
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>

      <HelpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={tickers}
        onSelect={(selected) => {
          if (selected) onTickerChange(selected.symbol);
        }}
      />

    </div>
  );
}
