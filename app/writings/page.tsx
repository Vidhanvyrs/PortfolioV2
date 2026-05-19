import React from "react";
import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";

export default function WritingsPage() {
  const blogs = getAllBlogs();

  return (
    <main className="max-w-[720px] mx-auto px-6 py-20">
      <h1 className="text-[32px] font-bold mb-2">Writings</h1>
      <p className="text-[15px] text-[#555] mb-12">
        My thoughts, tutorials, and deep dives on software architecture, engineering, and AI.
      </p>

      <div className="space-y-6">
        {blogs.length === 0 ? (
          <p className="text-[14px] text-[#888] italic">No articles published yet. Check back soon!</p>
        ) : (
          blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/writings/${blog.slug}`}
              className="block p-6 rounded-xl border border-border/40 bg-terracotta/5 hover:bg-white hover:border-terracotta/50 transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <h2 className="text-[17px] font-bold text-black group-hover:text-terracotta transition-colors leading-snug">
                  {blog.title}
                </h2>
                <time className="text-[12px] text-[#777] font-medium shrink-0 pt-0.5">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <p className="text-[14px] text-[#555] leading-relaxed mb-4">
                {blog.description}
              </p>

              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-cream border border-border text-[#666]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
