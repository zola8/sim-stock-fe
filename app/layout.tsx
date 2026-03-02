import Header from "./components/header/Header";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] transition-colors duration-300">
          <main className="flex min-h-screen flex-col mx-auto w-full max-w-7xl bg-[var(--card)] shadow-[var(--shadow-2xl)] border-l border-r border-[var(--border)]">
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
