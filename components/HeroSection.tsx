"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiEye,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { SiMedium, SiX } from "react-icons/si";
import { greetings, heroData } from "@/lib/data";

type Phase = "typing" | "pausing" | "deleting" | "done";

const PROFILE_ROLES = [
  "Full Stack Engineer",
  "AI Engineer",
  "Designer",
  "Programmer",
  "GymNerd",
] as const;

const contactLinks = [
  { label: "GitHub", href: "https://github.com/Vidhanvyrs", icon: FiGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vidhan-solanki-dotlasher001/",
    icon: FiLinkedin,
  },
  { label: "Twitter", href: "https://x.com/DotLasher", icon: SiX },
  { label: "Mail", href: "mailto:vidhanvyrs@gmail.com", icon: FiMail },
  {
    label: "Medium",
    href: "https://medium.com/@vidhanvyrs",
    icon: SiMedium,
  },
] as const;

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [profileRoleIndex, setProfileRoleIndex] = useState(0);
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const greetingIndexRef = useRef(0);
  const loopCountRef = useRef(0); // tracks how many full cycles completed

  useEffect(() => {
    const roleTimer = window.setInterval(() => {
      setProfileRoleIndex((current) => (current + 1) % PROFILE_ROLES.length);
    }, 2200);

    return () => window.clearInterval(roleTimer);
  }, []);

  useEffect(() => {
    const sessionKey = "vidhan-portfolio-visit-count";
    const cachedCount = window.sessionStorage.getItem(sessionKey);

    if (cachedCount) {
      setVisitCount(Number(cachedCount));
      return;
    }

    const controller = new AbortController();

    async function recordVisit() {
      try {
        const response = await fetch("/api/visits", {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = (await response.json()) as { count: number | null };

        if (typeof data.count === "number") {
          setVisitCount(data.count);
          window.sessionStorage.setItem(sessionKey, String(data.count));
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Unable to load visit count", error);
        }
      }
    }

    recordVisit();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (phase === "done") return;

    const currentGreeting = greetings[greetingIndexRef.current];

    let delay: number;

    switch (phase) {
      case "typing":
        if (displayText.length < currentGreeting.length) {
          delay = 80;
        } else {
          // Finished typing this greeting — pause before deleting
          setPhase("pausing");
          return;
        }
        break;

      case "pausing":
        delay = 1500; // hold the completed text for 1.5s
        break;

      case "deleting":
        if (displayText.length > 0) {
          delay = 40;
        } else {
          // Finished deleting — move to next greeting
          const nextIndex = greetingIndexRef.current + 1;

          if (nextIndex >= greetings.length) {
            // Completed one full loop through all languages
            loopCountRef.current += 1;
            greetingIndexRef.current = 0; // go back to English

            // After one full cycle, type English one last time and stop
            setPhase("typing");
            return;
          }

          greetingIndexRef.current = nextIndex;
          setPhase("typing");
          return;
        }
        break;

      default:
        return;
    }

    const timer = setTimeout(() => {
      switch (phase) {
        case "typing":
          setDisplayText(currentGreeting.slice(0, displayText.length + 1));

          // Check if we just finished typing AND this is the final resting state
          if (
            displayText.length + 1 === currentGreeting.length &&
            loopCountRef.current > 0 &&
            greetingIndexRef.current === 0
          ) {
            // We've looped once and landed back on English — done!
            setPhase("done");
          }
          break;

        case "pausing":
          setPhase("deleting");
          break;

        case "deleting":
          setDisplayText(currentGreeting.slice(0, displayText.length - 1));
          break;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, phase]);

  return (
    <section className="pb-12 pt-8" id="home">
      <div className="mb-5 overflow-hidden rounded-xl border border-border/70 bg-cream-card shadow-sm">
        <Image
          src="/aboutimgs/Studio Ghibli Movie GIF.gif"
          alt="Animated Studio Ghibli forest scene"
          width={500}
          height={270}
          priority
          unoptimized
          className="block aspect-[25/13] w-full object-cover"
        />
      </div>

      <div className="relative mb-8 rounded-xl border border-border/70 bg-white/45 p-4 shadow-sm sm:p-5">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border-[3px] border-white bg-white shadow-sm ring-1 ring-border/70 sm:h-[88px] sm:w-[88px]">
            <Image
              src="/aboutimgs/pp3.jpg"
              alt="Vidhan Solanki profile illustration"
              fill
              sizes="(max-width: 639px) 72px, 88px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 pr-12 sm:pr-20">
            <h1 className="min-h-[1.4em] whitespace-nowrap text-[17px] font-bold tracking-tight text-black sm:text-[25px]">
              <span className="sm:hidden">Hi, I&apos;m Vidhan.</span>
              <span className={`hidden pr-1 sm:inline ${phase !== "done" ? "blink-cursor" : ""}`}>
                {displayText}
              </span>
            </h1>
            <p
              key={PROFILE_ROLES[profileRoleIndex]}
              className="role-pop mt-0.5 text-[14px] font-semibold tracking-wide text-[#666] sm:text-[15px]"
            >
              {PROFILE_ROLES[profileRoleIndex]}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#777]">
              <FiMapPin aria-hidden="true" className="text-terracotta-hover" />
              22, Pune, IND
            </p>
          </div>
        </div>

        <p className="mt-4 border-t border-border/60 pt-4 text-[14px] leading-[1.75] text-[#555] sm:mt-5 sm:pt-5 sm:text-[15px]">
          {heroData.subtitle}
        </p>

        <div
          className="absolute right-4 top-4 flex items-center gap-2 text-[13px] tabular-nums text-[#777] sm:right-5 sm:top-5"
          title="Total site visits"
          aria-label={visitCount === null ? "Loading total site visits" : `${visitCount} total site visits`}
        >
          <FiEye aria-hidden="true" className="text-[17px]" />
          <span>{visitCount === null ? "—" : visitCount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Link
          href={heroData.ctaHref}
          className="inline-flex items-center px-6 py-3 bg-terracotta text-white text-[14px] font-medium rounded-md hover:bg-terracotta-hover transition-all active:scale-95 shadow-sm"
        >
          {heroData.ctaText}
        </Link>
        <a
          href="https://drive.google.com/file/d/1KUTqcIv6K1erI2oGYDHA3K-hqSVKBOpv/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border text-[14px] font-medium rounded-md text-[#555] hover:border-terracotta hover:text-black transition-all active:scale-95"
        >
          Download CV
        </a>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-5 overflow-hidden rounded-lg border border-border/60">
          {contactLinks.map((contact, index) => {
            const ContactIcon = contact.icon;

            return (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className={`group flex min-w-0 items-center justify-center gap-1.5 px-1 py-2.5 text-[13px] text-[#555] transition-colors hover:text-black sm:justify-start sm:px-2.5 sm:py-3 ${
                  index > 0 ? "border-l border-border/60" : ""
                }`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-white/45 text-[17px]">
                  <ContactIcon aria-hidden="true" />
                </span>
                <span className="hidden truncate sm:inline">{contact.label}</span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="ml-auto hidden shrink-0 text-[13px] text-[#888] sm:block"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
