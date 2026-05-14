import React from "react";
import Link from "next/link";
import { projectsData } from "@/lib/data";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-[720px] mx-auto px-6 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center text-[13px] text-[#888] hover:text-terracotta transition-colors mb-8 group"
      >
        <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span>
        All Projects
      </Link>

      <h1 className="text-[20px] sm:text-[30px] font-bold text-black mb-4">
        {project.title}
      </h1>

      <p className="text-[16px] sm:text-[15px] text-[#555] leading-relaxed mb-8">
        {project.fullDescription}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[12px] font-medium px-2 py-1 rounded bg-orange-100 text-[#666]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-6 mb-12">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-terracotta font-bold hover:underline underline-offset-4"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="border-t border-border pt-12">
        <h2 className="text-[15px] font-bold text-black mb-6">Technical highlights:</h2>
        <ul className="space-y-4">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start">
              <span className="text-terracotta mr-3 -mt-0.5">•</span>
              <p className="text-[13px] text-[#555] leading-relaxed">
                {highlight}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
