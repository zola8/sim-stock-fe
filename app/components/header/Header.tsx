"use client";

import { useState } from "react";
import Logo from "./Logo";
import MobileMenuButton from "./MobileMenuButton";
import SSMenuDropdown from "./SSMenuDropdown";
import MobileMenu from "./MobileMenu";

interface NavItem {
  name: string;
  href: string;
}

interface Props {
  navigation: NavItem[];
}

export default function Header({ navigation }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--sidebar-border)] bg-[var(--primary)] text-[var(--primary-foreground)] backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>

        <div className="flex lg:hidden">
          <MobileMenuButton
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SSMenuDropdown navigation={navigation} />
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
