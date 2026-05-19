import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Blog {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

const blogsDirectory = path.join(process.cwd(), "lib/blogs");

/**
 * Parses and returns all blogs from the lib/blogs directory, sorted by date (newest first).
 */
export function getAllBlogs(): Blog[] {
  // Check if directory exists
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const allBlogs = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Fallback values if frontmatter is missing
      const title = data.title || formatTitleFromSlug(slug);
      const description = data.description || "A blog post by Vidhan Solanki.";
      const date = data.date ? String(data.date) : new Date().toISOString().split("T")[0];
      const tags = data.tags || [];

      return {
        slug,
        title,
        description,
        date,
        tags,
        content,
      };
    });

  // Sort blogs by date descending
  return allBlogs.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  });
}

/**
 * Returns a specific blog post by its slug, parsing markdown to HTML.
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // If the content starts with an H1 header matching the title or just any H1 header, we strip it
    // so we don't display a duplicate title on the page.
    let cleanContent = content.trim();
    if (cleanContent.startsWith("# ")) {
      const firstNewlineIndex = cleanContent.indexOf("\n");
      if (firstNewlineIndex !== -1) {
        cleanContent = cleanContent.slice(firstNewlineIndex).trim();
      }
    }

    // Convert markdown to HTML
    const parsedContent = await marked.parse(cleanContent);

    // Fallback values
    const title = data.title || formatTitleFromSlug(slug);
    const description = data.description || "A blog post by Vidhan Solanki.";
    const date = data.date ? String(data.date) : new Date().toISOString().split("T")[0];
    const tags = data.tags || [];

    return {
      slug,
      title,
      description,
      date,
      tags,
      content: parsedContent,
    };
  } catch (error) {
    console.error(`Error loading blog by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Helper to capitalize/format slug in case title is missing
 */
function formatTitleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
