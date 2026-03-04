import { navigation } from "@/app/utils/menulinks";
import Link from "next/link";


export default function NavigationCard() {
  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-full max-w-md p-6 rounded-[var(--radius)] shadow-[var(--shadow)] border-[1px] border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] font-[var(--font-sans)]">

        <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-[var(--muted-foreground)]">
          Navigation
        </h3>
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isSeparator = item.name === "---";

            if (isSeparator) {
              return;
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center justify-between px-3 py-2 rounded-[calc(var(--radius)-2px)] transition-all duration-200 hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
