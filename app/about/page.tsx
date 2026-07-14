"use client";

import React from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  SiAmazonwebservices,
  SiAnthropic,
  SiAppwrite,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiFramer,
  SiGit,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiVuedotjs,
  SiCss3,
  SiHtml5,
} from "react-icons/si";
import {
  TbDatabaseSearch,
  TbEyeCode,
  TbHexagonLetterP,
  TbPointer,
  TbRouteAltLeft,
} from "react-icons/tb";
import { techStack } from "@/lib/data";

type TechDetails = { icon: IconType; href: string; color: string };

const TECH_NOTES = [
  261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99, 880,
  1046.5, 1174.66, 1318.51, 1567.98, 1760, 2093,
] as const;

const techDetails: Record<(typeof techStack)[number]["label"], TechDetails> = {
  "Claude Code": { icon: SiAnthropic, href: "https://docs.anthropic.com/en/docs/claude-code/overview", color: "#D97757" },
  Cursor: { icon: TbPointer, href: "https://cursor.com/docs", color: "#7C5CFC" },
  "Node.js": { icon: SiNodedotjs, href: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", color: "#5FA04E" },
  "React.js": { icon: SiReact, href: "https://react.dev/", color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, href: "https://nextjs.org/docs", color: "#8B8B8B" },
  Python: { icon: SiPython, href: "https://docs.python.org/3/", color: "#3776AB" },
  FastAPI: { icon: SiFastapi, href: "https://fastapi.tiangolo.com/", color: "#009688" },
  "Vue 3": { icon: SiVuedotjs, href: "https://vuejs.org/guide/introduction.html", color: "#42B883" },
  Pinia: { icon: TbHexagonLetterP, href: "https://pinia.vuejs.org/introduction.html", color: "#FFD859" },
  "AWS ECS": { icon: SiAmazonwebservices, href: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html", color: "#FF9900" },
  "Computer Vision": { icon: TbEyeCode, href: "https://docs.opencv.org/4.x/d1/dfb/intro.html", color: "#8B5CF6" },
  Flask: { icon: SiFlask, href: "https://flask.palletsprojects.com/", color: "#8B8B8B" },
  Langchain: { icon: SiLangchain, href: "https://docs.langchain.com/oss/python/langchain/overview", color: "#43C59E" },
  RAG: { icon: TbDatabaseSearch, href: "https://aws.amazon.com/what-is/retrieval-augmented-generation/", color: "#A855F7" },
  "Agentic Workflows": { icon: TbRouteAltLeft, href: "https://www.anthropic.com/research/building-effective-agents", color: "#EC4899" },
  "Express.js": { icon: SiExpress, href: "https://expressjs.com/", color: "#8B8B8B" },
  Docker: { icon: SiDocker, href: "https://docs.docker.com/get-started/", color: "#2496ED" },
  MongoDB: { icon: SiMongodb, href: "https://www.mongodb.com/docs/", color: "#47A248" },
  MySQL: { icon: SiMysql, href: "https://dev.mysql.com/doc/", color: "#4479A1" },
  Prisma: { icon: SiPrisma, href: "https://www.prisma.io/docs", color: "#AAB7C4" },
  Redux: { icon: SiRedux, href: "https://redux.js.org/introduction/getting-started", color: "#764ABC" },
  "Tailwind CSS": { icon: SiTailwindcss, href: "https://tailwindcss.com/docs", color: "#06B6D4" },
  HTML: { icon: SiHtml5, href: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "#E34F26" },
  CSS: { icon: SiCss3, href: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "#1572B6" },
  Javascript: { icon: SiJavascript, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#E8C900" },
  Git: { icon: SiGit, href: "https://git-scm.com/doc", color: "#F05032" },
  Firebase: { icon: SiFirebase, href: "https://firebase.google.com/docs", color: "#FFCA28" },
  Appwrite: { icon: SiAppwrite, href: "https://appwrite.io/docs", color: "#FD366E" },
  "Framer Motion": { icon: SiFramer, href: "https://motion.dev/docs/react", color: "#0055FF" },
};

export default function AboutPage() {
  const audioContextRef = React.useRef<AudioContext | null>(null);

  React.useEffect(() => {
    return () => {
      void audioContextRef.current?.close();
    };
  }, []);

  const playTechTone = async (frequency = 1000, duration = 0.045) => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextClass) return;

      const audioContext =
        audioContextRef.current ?? (audioContextRef.current = new AudioContextClass());

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        frequency * 0.8,
        now + duration,
      );
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3000, now);
      filter.Q.setValueAtTime(0.7, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.01);
    } catch {
      // Some browsers require a click before allowing hover-triggered audio.
    }
  };

  return (
    <main className="max-w-[720px] mx-auto px-6 py-20">
      {/* ---- About Me ---- */}
      <section className="mb-16">
        <h1 className="text-[32px] font-bold mb-6">About Me</h1>

        <div className="space-y-5 text-[15px] text-[#555] leading-[1.8]">
          <p>
            I&apos;m a software engineer who genuinely enjoys building products that solve actual problems.
            After graduating in 2025 with a B.Tech in Computer Science and AI, I&apos;ve had the chance to work across
            full-stack web development, AI platforms, and a handful of exciting tech startups.
          </p>

          <p>
            Right now, I work as a Specialist Engineer at Infosys. I&apos;m responsible for the Flask backend powering tensAI,
            which is a large-scale agentic RAG platform built on SAP BTP. Some of my favorite work there includes designing a
            hybrid retrieval pipeline combining BM25, dense vectors, and a reranker, as well as building custom document parsers
            to handle multiple file formats. Prior to Infosys, I was a Full Stack Developer at Acencore Technologies where I helped build
            their AI-assisted hiring platform and launched their first AI-driven video interview experience. Even during college,
            I loved keeping busy by collaborating with startups and taking on freelance projects.
          </p>

          <p>
            Computers have fascinated me for as long as I can remember. From playing around with basic HTML pages as a kid to
            engineering full-stack applications and complex AI tools today, my journey has always been fueled by pure curiosity.
            I don&apos;t just write code for the sake of a resume, but because I love getting my hands dirty with new technologies.
            Whether I&apos;m exploring RAG pipelines, diving into agentic workflows, or just testing out a random npm package that caught my eye,
            that same childhood curiosity is exactly what keeps me building every day.
          </p>
        </div>
      </section>

      <hr className="w-full h-px bg-border border-none my-12" />

      {/* ---- Tech I Work With ---- */}
      <section className="mb-16">
        <div className="mb-6 flex items-baseline gap-2">
          <h2 className="text-[22px] font-bold">Tech I Work With</h2>
          <span className="text-[12px] font-normal text-[#888]">(hover to play)</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech, index) => {
            const details = techDetails[tech.label];
            const TechIcon = details.icon;

            return (
              <a
                key={tech.label}
                href={details.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read about ${tech.label}`}
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover)").matches) {
                    void playTechTone(TECH_NOTES[index % TECH_NOTES.length], 0.08);
                  }
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === "touch") {
                    void playTechTone(TECH_NOTES[index % TECH_NOTES.length], 0.08);
                  }
                }}
                style={{ "--tech-color": details.color } as React.CSSProperties}
                className="tech-chip inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-white/45 px-2.5 py-1.5 text-[13px] font-normal text-[#555] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <TechIcon aria-hidden="true" className="tech-icon shrink-0 text-[14px] transition-colors duration-200" />
                {tech.label}
              </a>
            );
          })}
        </div>
      </section>

      <hr className="w-full h-px bg-border border-none my-12" />

      {/* ---- Beyond the Code ---- */}
      <section className="mb-16">
        <h2 className="text-[22px] font-bold mb-4">Beyond the Code</h2>

        <p className="text-[15px] text-[#555] leading-[1.8] mb-10">
          When I&apos;m not writing code, you&apos;ll find me sketching,
          watching F1 races, Reading tech blogs on X, hitting PRs at the gym or Drinking Chai.
          {/* I&apos;m always learning something new — currently diving deep into
          System Design and AI architectures; reading books like AI Engineer & System Design Interview. */}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mb-10 justify-center">
          <div className="border border-border rounded-lg px-8 py-4 text-center">
            <span className="block text-[28px] font-bold text-terracotta">
              10
            </span>
            <span className="text-[13px] text-[#888]">Projects Shipped</span>
          </div>
          <div className="border border-border rounded-lg px-8 py-4 text-center">
            <span className="block text-[28px] font-bold text-terracotta">
              4
            </span>
            <span className="text-[13px] text-[#888]">Companies</span>
          </div>
        </div>

        <div className="columns-2 gap-3 sm:columns-3">
          {Array.from({ length: 39 }, (_, i) => i + 1)
            .filter((num) => num !== 7)
            .map((num) => {
            const ext =
              num >= 15
                ? "jpeg"
                : num === 14
                  ? "png"
                  : "jpg";
            return (
              <div
                key={num}
                className="group relative mb-3 break-inside-avoid overflow-hidden rounded-lg border border-border bg-white"
              >
                <Image
                  src={`/aboutimgs/img${num}.${ext}`}
                  alt={`Photo ${num}`}
                  width={800}
                  height={800}
                  sizes="(max-width: 640px) 50vw, 220px"
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            );
          })}
        </div>
        {/* <p className="text-[12px] text-[#aaa] text-center mt-3">
          Add your photos here — replace the placeholders above with images from
          /public/
        </p> */}
      </section>
    </main>
  );
}
