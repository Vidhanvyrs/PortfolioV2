"use client";

import React from "react";
import Link from "next/link";
import { flushSync } from "react-dom";
import {
  FiBookOpen,
  FiBriefcase,
  FiFolder,
  FiHome,
  FiMail,
  FiMoon,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import { useTheme } from "@/context/theme-context";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

const mobileNavLinks = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "About", href: "/about", icon: FiUser },
  { name: "Experience", href: "/experience", icon: FiBriefcase },
  { name: "Projects", href: "/projects", icon: FiFolder },
  { name: "Writings", href: "/writings", icon: FiBookOpen },
  { name: "Contact", href: "/contact", icon: FiMail },
] as const;

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
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

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
    <>
    <header className="sticky top-0 z-50 hidden border-b border-border/50 bg-cream/80 backdrop-blur-md sm:block">
      <div className="max-w-[720px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-base font-bold tracking-tight hover:text-terracotta">
          vidhan
        </Link>

        <button
          type="button"
          onClick={handleThemeToggle}
          className="order-3 ml-3 grid h-9 w-9 place-items-center text-[#555]"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
        </button>

        {/* Links */}
        <nav className="order-2 ml-auto flex items-center gap-7">
          <ul className="flex flex-col sm:flex-row items-center gap-6 sm:gap-7 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-[14px] text-[#555] hover:text-black transition-colors font-normal relative group py-1"
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

    <nav
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center rounded-[22px] border border-border bg-cream px-2 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.18)] sm:hidden"
      aria-label="Mobile navigation"
    >
      {mobileNavLinks.map((link) => {
        const Icon = link.icon;
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            aria-label={link.name}
            title={link.name}
            aria-current={isActive ? "page" : undefined}
            className={`relative grid h-10 w-10 place-items-center rounded-xl text-[19px] transition-colors ${
              isActive ? "bg-terracotta/20 text-black" : "text-[#777]"
            }`}
          >
            <Icon aria-hidden="true" />
            {isActive && (
              <span className="absolute bottom-1 h-1 w-1 rounded-full bg-terracotta-hover" />
            )}
          </Link>
        );
      })}

      <span aria-hidden="true" className="mx-1 h-7 w-px bg-border" />

      <button
        type="button"
        onClick={handleThemeToggle}
        className="grid h-10 w-10 place-items-center rounded-xl text-[20px] text-[#777]"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        {theme === "light" ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
      </button>
    </nav>
    </>
  );
}
