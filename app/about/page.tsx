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
            I&apos;m a software engineer who loves building things that solve
            real problems. I graduated in 2025 with a B.Tech in CSE (AI) and
            have since worked across full-stack web development, AI platforms,
            and various tech startups.
          </p>

          <p>
            Currently, I&apos;m a Specialist Engineer at Infosys, owning the
            Flask backend for tensAI — an enterprise-grade agentic RAG platform
            on SAP BTP. I designed a hybrid retrieval pipeline (BM25 + dense
            vectors + reranker), built multi-format document parsers for
            PDF/PPTX/DOCX/Excel ingestion, and developed a RAGAS-based
            evaluation framework.
            Before Infosys, I was a Full Stack Developer at Acencore
            Technologies, building their AI-assisted hiring platform and
            shipping a V-0 AI-driven video interview flow.
            During my college years, I worked with various startups and also took on freelance gigs alongside my work in tech.
          </p>

          <p>
            Computers have been a part of my life for as long as I can remember.
            From tinkering with HTML pages as a kid to building full-stack
            applications and AI-powered tools today, I&apos;ve always been driven
            by curiosity. I don&apos;t just build for resumes — I genuinely love
            exploring new technologies, whether it&apos;s RAG pipelines, agentic
            workflows, or a random npm package that caught my eye. That hands-on
            curiosity is what drew me to engineering and keeps me building today.
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
              className="inline-flex items-center gap-1.5 text-[13px] text-[#555] bg-orange-100 rounded-full border px-3 py-1 font-normal"
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
            <div
              key={num}
              className="aspect-square rounded-lg overflow-hidden border border-border bg-white group relative"
            >
              <Image
                src={`/aboutimgs/img${num}.${num === 14 ? "png" : "jpg"}`}
                alt={`Photo ${num}`}
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
        </div>
        {/* <p className="text-[12px] text-[#aaa] text-center mt-3">
          Add your photos here — replace the placeholders above with images from
          /public/
        </p> */}
      </section>
    </main>
  );
}
