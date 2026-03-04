"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { NavItem } from "./Header";


interface NavigationProps {
  navigation: NavItem[];
}


export default function SSMenuDropdown({ navigation }: NavigationProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="group inline-flex w-full justify-center gap-x-2 rounded-md bg-[var(--secondary)] px-3 py-2 text-sm font-medium text-[var(--secondary-foreground)] ring-1 ring-inset ring-[var(--border)] hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
          <span className="hidden sm:block">Navigation</span>
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
          {navigation.map((item, index) => {
            if (item.name === "---") {
              return (
                <div key={`divider-${index}`} className="my-1 border-t border-[var(--border)]" />
              );
            }

            return (
              <MenuItem key={`${item.name}-${index}`}>
                {({ focus }) => (
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 text-sm ${focus
                        ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                        : "text-[var(--popover-foreground)]"
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </MenuItem>
            );
          })}
        </div>
      </MenuItems>
    </Menu>
  );
}
