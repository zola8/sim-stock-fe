import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenuButton({ isOpen, onToggle }: Props) {
  return (
    <button
      type="button"
      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--primary-foreground)] hover:text-[var(--muted)] focus:outline-none cursor-pointer"
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open main menu"}
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? (
        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
}
