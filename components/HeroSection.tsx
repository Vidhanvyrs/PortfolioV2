"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { greetings, heroData } from "@/lib/data";

type Phase = "typing" | "pausing" | "deleting" | "done";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const greetingIndexRef = useRef(0);
  const loopCountRef = useRef(0); // tracks how many full cycles completed

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
    <section className="pt-20 pb-12" id="home">
      <div className="text-[32px] sm:text-[40px] font-bold text-black mb-4 min-h-[1.5em] flex items-start">
        <span className={`pr-1 ${phase !== "done" ? "blink-cursor" : ""}`}>
          {displayText}
        </span>
      </div>

      <p className="text-base sm:text-[17px] text-[#555] leading-[1.8] max-w-[560px] mb-8">
        {heroData.subtitle}
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        <Link
          href={heroData.ctaHref}
          className="inline-flex items-center px-6 py-3 bg-terracotta text-white text-[14px] font-medium rounded-md hover:bg-terracotta-hover transition-all active:scale-95 shadow-sm"
        >
          {heroData.ctaText}
        </Link>
        <a
          href="https://drive.google.com/file/d/1NZ7l5GXfJsRRnoNzDSf2R68eTvScUxM6/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border text-[14px] font-medium rounded-md text-[#555] hover:border-terracotta hover:text-black transition-all active:scale-95"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
