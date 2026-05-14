import React from "react";
import Link from "next/link";
import { projectsData, ProjectCategory } from "@/lib/data";

export default function ProjectsPage() {
  const categories: ProjectCategory[] = [
    "Personal Projects",
    "Professional Work",
    "Open Source Contributions",
  ];

  return (
    <main className="max-w-[720px] mx-auto px-6 py-20">
      <h1 className="text-[32px] font-bold mb-2">Projects</h1>
      <p className="text-[15px] text-[#555] mb-12">
        A mix of personal builds, professional work, and open source contributions.
      </p>

      <div className="space-y-16">
        {categories.map((category) => {
          const projects = projectsData.filter((p) => p.category === category);
          if (projects.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="text-[18px] font-bold mb-6 text-black border-b border-border pb-2 inline-block">
                {category}
              </h2>

              <div className="space-y-6">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="block p-6 rounded-lg border border-border bg-transparent hover:border-terracotta transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[17px] font-bold text-black group-hover:text-terracotta transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-[14px] text-[#555] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2 py-0.5 rounded bg-cream border border-border text-[#666]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.links.map((link) => (
                        <span
                          key={link.label}
                          className="text-[13px] text-terracotta font-medium hover:underline"
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
        })}
      </div>
    </main>
  );
}
