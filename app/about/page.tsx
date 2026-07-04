import React from "react";
import Image from "next/image";
import { techStack } from "@/lib/data";

export default function AboutPage() {
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
        <h2 className="text-[22px] font-bold mb-6">Tech I Work With</h2>

        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 text-[13px] text-[#555] bg-gray-50 rounded-full border border-terracotta px-3 py-1 font-normal"
            >
              <span className="text-sm">{tech.emoji}</span>
              {tech.label}
            </span>
          ))}
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

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                className="aspect-square rounded-lg overflow-hidden border border-border bg-white group relative"
              >
                <Image
                  src={`/aboutimgs/img${num}.${ext}`}
                  alt={`Photo ${num}`}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
