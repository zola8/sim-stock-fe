export default function Logo() {
  return (
    <div className="-m-1.5 p-1.5 flex items-center gap-2 cursor-default">
      <div className="h-8 w-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-[var(--accent-foreground)] font-bold shadow-[var(--shadow-sm)]">
        S$
      </div>
      <span className="font-semibold text-xl tracking-tight text-[var(--primary-foreground)]">
        sim-$tock
      </span>
    </div>
  );
}
