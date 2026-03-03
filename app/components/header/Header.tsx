"use client";

import { useState } from "react";
import ClearCacheButton from "./ClearCacheButton";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import SSMenuDropdown from "./SSMenuDropdown";
import { clearAllCaches } from "@/app/utils/backend_services";


export interface NavItem {
  name: string;
  href: string;
}


const navigation: NavItem[] = [
  { name: "Ticker info", href: "/ticker-info" },
  { name: "Charts", href: "/charts" },
  { name: "cccccc", href: "#" },
  { name: "---", href: "#" },
  { name: "ddd", href: "#" },
];



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function clearCache(): void {
    clearAllCaches();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--sidebar-border)] bg-[var(--primary)] text-[var(--primary-foreground)] backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16">
        <Logo />

        <div className="hidden sm:flex items-center">
          <ClearCacheButton onClearCache={clearCache} />
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <SSMenuDropdown navigation={navigation} />
        </div>

        <div className="flex lg:hidden">
          <MobileMenuButton
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>

        <div className="lg:hidden">
          <ClearCacheButton onClearCache={clearCache} />
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        navigation={navigation}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
