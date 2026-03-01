"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const navigation = [
  { name: "aaaa", href: "#" },
  { name: "bbbb", href: "#" },
  { name: "cccccc", href: "#" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // Main Wrapper: Background and Text Color
    <div className="flex min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] transition-colors duration-300">

      <main className="flex min-h-screen w-full max-w-7xl flex-col mx-auto bg-[var(--card)] shadow-[var(--shadow-2xl)] sm:my-0 my-0 rounded-none sm:rounded-none border-l border-r border-[var(--border)]">

        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-[var(--sidebar-border)] bg-[var(--primary)] text-[var(--primary-foreground)] backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

            {/* Logo Area (Link Removed) */}
            <div className="flex lg:flex-1">
              <div className="-m-1.5 p-1.5 flex items-center gap-2 cursor-default">
                {/* Logo Icon */}
                <div className="h-8 w-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-[var(--accent-foreground)] font-bold shadow-[var(--shadow-sm)]">
                  S
                </div>
                <span className="font-semibold text-xl tracking-tight text-[var(--primary-foreground)]">sim-stock</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--primary-foreground)] hover:text-[var(--muted)] focus:outline-none cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Desktop Navigation Links (Removed from here and moved to Dropdown) */}
            
            {/* Profile Dropdown (Headless UI) - Now includes Navigation */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  {/* Button */}
                  <MenuButton className="group inline-flex w-full justify-center gap-x-2 rounded-md bg-[var(--secondary)] px-3 py-2 text-sm font-medium text-[var(--secondary-foreground)] ring-1 ring-inset ring-[var(--border)] hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-[var(--chart-1)] to-[var(--chart-2)]" />
                    <span className="hidden sm:block">Account</span>
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[var(--popover)] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    
                    {/* Navigation Links moved here */}
                    {navigation.map((item) => (
                      <MenuItem key={item.name}>
                        {({ focus }) => (
                          <a
                            href={item.href}
                            className={`block px-4 py-2 text-sm ${focus
                              ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                              : "text-[var(--popover-foreground)]"
                              }`}
                          >
                            {item.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}

                    <div className="my-1 border-t border-[var(--border)]" />

                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm ${focus
                            ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                            : "text-[var(--popover-foreground)]"
                            }`}
                        >
                          Settings
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm ${focus
                            ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                            : "text-[var(--popover-foreground)]"
                            }`}
                        >
                          Sign out
                        </a>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </nav>

          {/* Mobile Menu Panel */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-[var(--sidebar-border)] bg-primary-foreground">
              <div className="space-y-1 px-6 pb-3 pt-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="mt-4 pt-4 border-t border-[var(--sidebar-border)]">
                  <a href="#" className="block px-3 py-2 text-base font-medium text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]">
                    Sign in
                  </a>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center px-6 py-6 text-center sm:px-12 lg:py-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-7xl mb-6">
            sim-stock
          </h1>
          <p className="max-w-3xl text-xl leading-8 text-[var(--muted-foreground)] mb-10">
            aaaaaa
          </p>
        </div>

      </main>
    </div>
  );
}