import React from "react";
import { experiencesData } from "@/lib/data";

export default function ExperiencePage() {
  return (
    <main className="max-w-[720px] mx-auto px-6 py-20">
      <h1 className="text-[32px] font-bold mb-16 text-left">Experience</h1>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border" />

        <div className="space-y-12">
          {experiencesData.map((exp, index) => (
            <div key={index} className="relative pl-10">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-terracotta border-[3px] border-cream" />

              {/* Date */}
              <p className="text-[13px] text-[#888] mb-1">{exp.date}</p>

              {/* Title */}
              <h3 className="text-[17px] font-bold text-black">{exp.title}</h3>

              {/* Company link */}
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-terracotta hover:text-terracotta-hover transition-colors"
              >
                {exp.company}
              </a>

              {/* Location */}
              <p className="text-[13px] text-[#888] mt-0.5">{exp.location}</p>

              {/* Description */}
              <p className="text-[14.5px] text-[#555] leading-relaxed mt-2">
                {exp.description}
              </p>

              {/* Tech tags */}
              {exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {exp.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-[11.5px] text-[#555] border border-border rounded px-2.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bullet points */}
              {exp.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5 list-disc list-outside pl-4">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="text-[13.5px] text-[#555] leading-[1.7]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
