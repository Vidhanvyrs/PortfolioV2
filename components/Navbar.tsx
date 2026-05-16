"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-[720px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-base font-bold tracking-tight hover:text-terracotta">
          vidhan
        </Link>

        {/* Mobile toggle */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className={`block w-5 h-0.5 bg-black transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-black transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-black transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Links */}
        <nav className={`${menuOpen ? 'flex' : 'hidden'} sm:flex absolute sm:relative top-full sm:top-auto left-0 right-0 sm:left-auto bg-cream sm:bg-transparent border-b sm:border-none border-border flex-col sm:flex-row items-center gap-6 sm:gap-7 p-6 sm:p-0`}>
          <ul className="flex flex-col sm:flex-row items-center gap-6 sm:gap-7 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-[14px] text-[#555] hover:text-black transition-colors font-normal relative group py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-terracotta group-hover:w-full transition-all duration-300 ease-out" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
