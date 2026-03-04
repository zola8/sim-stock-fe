"use client";

import { useState } from "react";
import ClearCacheButton from "./ClearCacheButton";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import SSMenuDropdown from "./SSMenuDropdown";
import { clearAllCaches } from "@/app/utils/backend_services";
import { navigation } from "@/app/utils/menulinks";



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function clearCache(): void {
    clearAllCaches();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--sidebar-border)] bg-[var(--primary)] text-[var(--primary-foreground)] backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16">
        <Logo />

        <div className="flex items-center gap-2">
          <div className="">
            <ClearCacheButton onClearCache={clearCache} />
          </div>

          <div className="hidden lg:flex">
            <SSMenuDropdown navigation={navigation} />
          </div>

          <div className="flex lg:hidden">
            <MobileMenuButton
              isOpen={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
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
