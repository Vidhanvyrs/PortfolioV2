import React from "react";
import Link from "next/link";
import { featuredProjects } from "@/lib/data";

export default function FeaturedProjects() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] font-bold">Featured Projects</h2>
        <Link href="/projects" className="text-[14px] text-terracotta hover:text-terracotta-hover transition-colors flex items-center gap-1 hover:underline">
          All projects →
        </Link>
      </div>

      <div className="space-y-4">
        {featuredProjects.map((project, index) => (
          <Link
            key={index}
            href={`/projects/${project.slug}`}
            className="block border border-border/40 rounded-xl p-6 sm:p-8 bg-terracotta/5 hover:bg-white hover:shadow-xl hover:shadow-terracotta/5 hover:border-terracotta/50 transition-all duration-300 group"
          >
            <h3 className="text-[17px] font-bold mb-2 text-black group-hover:text-terracotta transition-colors">{project.title}</h3>
            <p className="text-[14.5px] text-[#555] leading-relaxed mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  className="text-[12px] text-[#555] border border-border rounded px-2.5 py-0.5 font-normal"
                  key={tagIndex}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {project.links.map((link, linkIndex) => (
                <span
                  key={linkIndex}
                  className="text-[13.5px] text-terracotta font-medium hover:text-terracotta-hover transition-colors underline-offset-2 hover:underline"
                >
                  {link.label}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
