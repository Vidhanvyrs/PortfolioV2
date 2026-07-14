"use client";

import React, { useState } from "react";
import Link from "next/link";
import { flushSync } from "react-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { navLinks } from "@/lib/data";
import { useTheme } from "@/context/theme-context";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

async function playThemeSound(theme: "light" | "dark") {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    await audioContext.resume();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(theme === "light" ? 760 : 560, now);
    oscillator.frequency.exponentialRampToValueAtTime(
      theme === "light" ? 420 : 300,
      now + 0.1,
    );
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.1);
    oscillator.addEventListener("ended", () => audioContext.close());
  } catch {
    // Theme switching should still work when browser audio is unavailable.
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    void playThemeSound(theme);

    const viewTransitionDocument = document as DocumentWithViewTransition;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!viewTransitionDocument.startViewTransition || prefersReducedMotion) {
      toggleTheme();
      return;
    }

    const buttonBounds = event.currentTarget.getBoundingClientRect();
    const x = buttonBounds.left + buttonBounds.width / 2;
    const y = buttonBounds.top + buttonBounds.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = viewTransitionDocument.startViewTransition(() => {
      flushSync(() => toggleTheme());
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 550,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-[720px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-base font-bold tracking-tight hover:text-terracotta">
          vidhan
        </Link>

        <button
          type="button"
          onClick={handleThemeToggle}
          className="order-3 ml-auto mr-2 grid h-9 w-9 place-items-center text-[#555] sm:ml-3 sm:mr-0"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
        </button>

        {/* Mobile toggle */}
        <button
          className="order-4 flex flex-col gap-1.5 p-1 sm:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className={`block w-5 h-0.5 bg-black transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-black transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-black transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Links */}
        <nav className={`${menuOpen ? 'flex' : 'hidden'} order-2 sm:flex absolute sm:relative top-full sm:top-auto left-0 right-0 sm:left-auto bg-cream sm:bg-transparent border-b sm:border-none border-border flex-col sm:flex-row items-center gap-6 sm:gap-7 p-6 sm:p-0 sm:ml-auto`}>
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
