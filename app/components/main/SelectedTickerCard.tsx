export interface SelectedTickerCardProps {
  selectedTicker: string;
}

export default function SelectedTickerCard({ selectedTicker }: SelectedTickerCardProps) {
  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-full max-w-md p-6 text-center rounded-[var(--radius)] shadow-[var(--shadow)] border-[1px] border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] font-[var(--font-sans)] transition-colors duration-200">

        <h3 className="text-sm font-medium uppercase tracking-wider mb-2 text-[var(--muted-foreground)]">
          Selected Ticker
        </h3>

        <p className="text-3xl font-bold break-all text-[var(--foreground)]">
          {selectedTicker}
        </p>

      </div>
    </div>
  );
}
