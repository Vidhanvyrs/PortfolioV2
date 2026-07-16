import React from "react";
import ProjectFolderCard from "@/components/ProjectFolderCard";
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
                  <ProjectFolderCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
