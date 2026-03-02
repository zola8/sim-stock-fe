import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ClearCacheButtonProps {
  onClearCache: () => void;
}

const ClearCacheButton: React.FC<ClearCacheButtonProps> = ({
  onClearCache,
}) => {
  return (
    <button
      onClick={onClearCache}
      className='group inline-flex justify-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium ring-1 bg-[var(--secondary)] text-[var(--secondary-foreground)] ring-1 ring-inset ring-[var(--border)] hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]'
    >
      <TrashIcon className="h-5 w-5" />
      Clear Cache
    </button>
  );
};

export default ClearCacheButton;
