interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[var(--foreground)]/30"
        onClick={onClose}
      />

      <div className="relative bg-[var(--card)] text-[var(--card-foreground)] rounded-[var(--radius)] p-6 max-w-md w-full mx-4 shadow-[var(--shadow)] border border-[var(--border)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tracker Help</h2>
          <button
            onClick={onClose}
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 text-[var(--muted-foreground)]">
          <p>
            Enter your tracker ID to begin monitoring your assets.
          </p>
          <p>
            <strong>Format:</strong> Trackers should be alphanumeric strings (e.g., <code className="bg-[var(--input)] px-2 py-1 rounded text-[var(--foreground)]">TRK-12345</code>)
          </p>
          <p>
            <strong>Need help?</strong> Contact support if you cannot locate your tracker ID.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)] hover:opacity-90 transition-opacity"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
