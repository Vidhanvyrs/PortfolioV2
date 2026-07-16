"use client";

import React, { useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const ABOUT_PARAGRAPHS = [
  [
    "I'm a software engineer who genuinely enjoys building products that solve actual problems.",
    "After graduating in 2025 with a B.Tech in Computer Science and AI, I've had the chance to work across full-stack web development, AI platforms, and a handful of exciting tech startups.",
  ],
  [
    "Right now, I work as a Specialist Engineer at Infosys.",
    "I'm responsible for the Flask backend powering tensAI, which is a large-scale agentic RAG platform built on SAP BTP.",
    "Some of my favorite work there includes designing a hybrid retrieval pipeline combining BM25, dense vectors, and a reranker, as well as building custom document parsers to handle multiple file formats.",
    "Prior to Infosys, I was a Full Stack Developer at Acencore Technologies where I helped build their AI-assisted hiring platform and launched their first AI-driven video interview experience.",
    "Even during college, I loved keeping busy by collaborating with startups and taking on freelance projects.",
  ],
  [
    "Computers have fascinated me for as long as I can remember.",
    "From playing around with basic HTML pages as a kid to engineering full-stack applications and complex AI tools today, my journey has always been fueled by pure curiosity.",
    "I don't just write code for the sake of a resume, but because I love getting my hands dirty with new technologies.",
    "Whether I'm exploring RAG pipelines, diving into agentic workflows, or just testing out a random npm package that caught my eye, that same childhood curiosity is exactly what keeps me building every day.",
  ],
] as const;

const LINE_COUNT = ABOUT_PARAGRAPHS.flat().length;

type AnimatedLineProps = {
  children: React.ReactNode;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
};

function AnimatedLine({
  children,
  index,
  progress,
  reduceMotion,
}: AnimatedLineProps) {
  const start = index / (LINE_COUNT + 3);
  const end = Math.min(start + 0.2, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);

  return (
    <motion.p style={reduceMotion ? undefined : { opacity, y }}>
      {children}
    </motion.p>
  );
}

export default function AnimatedAboutText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 18%", "end 32%"],
  });
  const revealedProgress = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (latestProgress) => {
    if (latestProgress > revealedProgress.get()) {
      revealedProgress.set(latestProgress);
    }
  });

  let lineIndex = 0;

  return (
    <div
      ref={containerRef}
      className="space-y-7 text-[15px] leading-[1.8] text-[#555]"
    >
      {ABOUT_PARAGRAPHS.map((paragraph, paragraphIndex) => (
        <div key={paragraphIndex} className="space-y-2.5">
          {paragraph.map((line) => {
            const index = lineIndex++;

            return (
              <AnimatedLine
                key={line}
                index={index}
                progress={revealedProgress}
                reduceMotion={reduceMotion}
              >
                {line}
              </AnimatedLine>
            );
          })}
        </div>
      ))}
    </div>
  );
}
