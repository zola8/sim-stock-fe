import Link from 'next/link';


export default function Logo() {
  return (
    <div className="-m-1.5 p-1.5">
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <span className="h-8 w-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-[var(--accent-foreground)] font-bold shadow-[var(--shadow-sm)]">
          <img src="favicon.ico" />
        </span>
        <span className="font-semibold text-xl tracking-tight text-[var(--primary-foreground)]">
          sim-$tock
        </span>
      </Link>
    </div>
  );
}
