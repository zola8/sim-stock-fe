import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { TickerListElement } from '../utils/tickerListParser';


interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TickerListElement[];
  onSelect: (selected: TickerListElement | null) => void;
}

export function HelpModal({ isOpen, onClose, data, onSelect }: HelpModalProps) {
  const [selectedRow, setSelectedRow] = useState<TickerListElement | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setSearch(searchInput), 250);
    return () => clearTimeout(id);
  }, [searchInput]);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const term = search.toLowerCase();
    return data.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.symbol.toLowerCase().includes(term)
    );
  }, [data, search]);

  const visibleRows = useMemo(
    () => filteredData.slice(0, 100),
    [filteredData]
  );

  if (!isOpen) {
    return null;
  }

  const handleSelect = () => {
    onSelect(selectedRow);
    onClose();
  };

  const handleCancel = () => {
    setSelectedRow(null);
    onSelect(null);
    onClose();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[var(--foreground)]/30"
        onClick={onClose}
      />

      <div className="relative bg-[var(--card)] text-[var(--card-foreground)] rounded-[var(--radius)] p-6 w-full max-w-4xl mx-4 shadow-[var(--shadow)] border border-[var(--border)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select a Stock</h2>
          <button
            onClick={onClose}
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center mb-3 bg-[var(--input)] border border-[var(--border)] rounded-[var(--radius)] px-2 py-1">
          <MagnifyingGlassIcon className="w-4 h-4 text-[var(--muted-foreground)] mr-2" />
          <input
            type="text"
            placeholder="Search by name or symbol..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full bg-transparent focus:outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm"
          />
        </div>

        <div className="max-h-72 overflow-y-auto border border-[var(--border)] rounded-[var(--radius)]">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-[var(--secondary)] text-[var(--secondary-foreground)] sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Symbol</th>
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Country</th>
                <th className="px-3 py-2 text-left font-medium">Industry</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => {
                const isSelected = selectedRow?.symbol === row.symbol;
                return (
                  <tr
                    key={row.symbol}
                    className={`cursor-pointer transition-colors ${isSelected
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'hover:bg-[var(--muted)]'
                      }`}
                    onClick={() => setSelectedRow(row)}
                  >
                    <td className="px-3 py-2">{row.symbol}</td>
                    <td className="px-3 py-2">{row.name}</td>
                    <td className="px-3 py-2">{row.country}</td>
                    <td className="px-3 py-2">{row.industry}</td>
                  </tr>
                );
              })}
              {visibleRows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-4 text-center text-[var(--muted-foreground)]"
                  >
                    No matches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > visibleRows.length && (
          <p className="mt-2 text-xs text-[var(--muted-foreground)]">
            Showing first {visibleRows.length} of {filteredData.length} results.
            Refine your search to narrow down.
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-[var(--radius)] hover:bg-[var(--accent)] transition-opacity"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            disabled={!selectedRow}
            className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
