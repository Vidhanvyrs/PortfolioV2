import React from "react";
import Link from "next/link";
import ProjectFolderCard from "@/components/ProjectFolderCard";
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

      <div className="space-y-5">
        {featuredProjects.map((project) => (
          <ProjectFolderCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
