'use client';

import { useState, ChangeEvent, MouseEvent } from 'react';
import { HelpModal } from './HelpModal';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { NasdaqEntry } from '../types';


interface TrackerInputProps {
  nasdaqData: NasdaqEntry[];
}


export default function TrackerInput({ nasdaqData }: TrackerInputProps) {
  const [trackerValue, setTrackerValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const tracker = formData.get('tracker') as string;

    if (!tracker.trim()) {
      setError('Please enter a tracker ID');
      return;
    }

    console.log('Submitting tracker:', tracker);
    setError(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackerValue(e.target.value);
    if (error) setError(null);
  };

  const handleHelpClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label
              htmlFor="tracker-input"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
              Tracker ID
            </label>
            <input
              id="tracker-input"
              name="tracker"
              type="text"
              value={trackerValue}
              onChange={handleInputChange}
              placeholder="Enter your tracker ID..."
              className={`w-full px-4 py-3 bg-[var(--input)] text-[var(--foreground)] rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] placeholder:text-[var(--muted-foreground)] transition-all`}
            />
            {error && (
              <p className="mt-2 text-sm text-[var(--destructive)]">{error}</p>
            )}
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={handleHelpClick}
              className="p-3 bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-[var(--radius)] hover:bg-[var(--accent)] transition-colors border border-[var(--border)]"
              aria-label="Help"
              title="Help"
            >
              <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!trackerValue.trim()}
        >
          Submit Tracker
        </button>
      </form>

      <HelpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={nasdaqData}
        onSelect={(selected) => {
          if (selected) setTrackerValue(selected.Symbol);
        }}
      />

    </div>
  );
}
