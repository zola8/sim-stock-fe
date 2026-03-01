"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Team", href: "#" },
  { name: "Projects", href: "#" },
];


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-300">

      <main className="flex min-h-screen w-full max-w-7xl flex-col mx-auto bg-white dark:bg-black shadow-2xl sm:my-0 my-0 rounded-none sm:rounded-none">

        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900 text-white backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

            {/* Logo Area */}
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/50">
                  S
                </div>
                <span className="font-semibold text-xl tracking-tight text-white">sim-stock</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-300 hover:text-white focus:outline-none"
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

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium leading-6 text-zinc-300 hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Profile Dropdown (Headless UI) */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  {/* CHANGED: Darker button styles to match header */}
                  <MenuButton className="group inline-flex w-full justify-center gap-x-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-medium text-white ring-1 ring-inset ring-zinc-700 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                    <span className="hidden sm:block">Account</span>
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-zinc-400 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm ${focus
                              ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white"
                              : "text-zinc-700 dark:text-zinc-300"
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
                              ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white"
                              : "text-zinc-700 dark:text-zinc-300"
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
            <div className="lg:hidden border-t border-zinc-800 bg-zinc-900">
              <div className="space-y-1 px-6 pb-3 pt-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <a href="#" className="block px-3 py-2 text-base font-medium text-white">
                    Sign in
                  </a>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center sm:px-12 lg:py-32">
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-7xl mb-6">
            sim-stock
          </h1>
          <p className="max-w-3xl text-xl leading-8 text-zinc-600 dark:text-zinc-400 mb-10">
            aaaaaa
          </p>
        </div>

      </main>
    </div>
  );
}
