import Header from "./components/header/Header";
import Dashboard from "./components/main/Dashboard";

const navigation = [
  { name: "aaaa", href: "#" },
  { name: "bbbb", href: "#" },
  { name: "cccccc", href: "#" },
  { name: "---", href: "#" },
  { name: "ddd", href: "#" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] transition-colors duration-300">
      <main className="flex min-h-screen w-full max-w-7xl flex-col mx-auto bg-[var(--card)] shadow-[var(--shadow-2xl)] sm:my-0 my-0 rounded-none sm:rounded-none border-l border-r border-[var(--border)]">
        <Header navigation={navigation} />
        <Dashboard />
      </main>
    </div>
  );
}
