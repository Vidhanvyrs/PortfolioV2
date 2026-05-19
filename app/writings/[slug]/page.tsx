import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function WritingDetailPage({ params }: PageProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="max-w-[720px] mx-auto px-6 py-16">
      <Link
        href="/writings"
        className="inline-flex items-center text-[13px] text-[#888] hover:text-terracotta transition-colors mb-8 group"
      >
        <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span>
        All Writings
      </Link>

      <div className="mb-8">
        <time className="text-[12px] text-[#777] font-semibold block mb-2">
          {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="text-[24px] sm:text-[32px] font-bold text-black mb-4 leading-tight tracking-tight">
          {blog.title}
        </h1>
        <p className="text-[15px] text-[#555] italic leading-relaxed mb-6">
          {blog.description}
        </p>

        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-0.5 bg-terracotta rounded text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <hr className="border-border/40 my-8" />

      {/* Render Parsed Markdown Body */}
      <article
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </main>
  );
}
