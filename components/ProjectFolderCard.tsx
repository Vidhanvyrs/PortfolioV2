"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";
import type { Project, ProjectAsset } from "@/lib/data";

function getProjectFileType(tags: string[]) {
  const stack = tags.join(" ").toLowerCase();

  if (stack.includes("typescript")) return "TS";
  if (stack.includes("next.js")) return "TSX";
  if (stack.includes("python") || stack.includes("fastapi") || stack.includes("flask")) return "PY";
  if (stack.includes("vue")) return "VUE";
  if (stack.includes("react")) return "JSX";
  if (stack.includes("javascript") || stack.includes("node") || stack.includes("express")) return "JS";
  if (stack.includes("html")) return "HTML";
  if (stack.includes("css") || stack.includes("scss") || stack.includes("tailwind")) return "CSS";
  if (stack.includes("rag") || stack.includes("ai") || stack.includes("llm") || stack.includes("mcp")) return "AI";
  if (stack.includes("open source")) return "OSS";

  return "PROJECT";
}

function ProjectFileFallback({ project }: { project: Project }) {
  const fileType = getProjectFileType(project.tags);

  return (
    <div className="project-folder-fallback">
      <span className="project-folder-fold" aria-hidden="true" />
      <FiFileText aria-hidden="true" className="text-[27px]" />
      <span className="mt-2 text-[18px] font-bold tracking-tight">.{fileType.toLowerCase()}</span>
      <span className="mt-auto max-w-full truncate text-[9px] font-semibold uppercase tracking-[0.16em] opacity-60">
        {project.slug.replaceAll("-", " ")}
      </span>
    </div>
  );
}

function FolderVideo({
  asset,
  active,
  onError,
}: {
  asset: Extract<ProjectAsset, { type: "video" }>;
  active: boolean;
  onError: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <video
      ref={videoRef}
      src={asset.src}
      poster={asset.poster}
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
      style={{ objectPosition: asset.focalPoint ?? "50% 50%" }}
      onError={onError}
    />
  );
}

function ProjectFolderPreview({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const [assetIndex, setAssetIndex] = useState(0);
  const [failedAssets, setFailedAssets] = useState<Set<number>>(() => new Set());
  const assetKey = JSON.stringify(project.assets ?? []);

  useEffect(() => {
    setFailedAssets(new Set());
    setAssetIndex(0);
  }, [assetKey]);

  const availableAssets =
    project.assets
      ?.map((asset, sourceIndex) => ({ asset, sourceIndex }))
      .filter(({ sourceIndex }) => !failedAssets.has(sourceIndex)) ?? [];
  const currentEntry =
    availableAssets.length > 0
      ? availableAssets[assetIndex % availableAssets.length]
      : undefined;
  const currentAsset = currentEntry?.asset;

  useEffect(() => {
    if (!active || availableAssets.length <= 1) {
      if (!active) setAssetIndex(0);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setAssetIndex((current) => (current + 1) % availableAssets.length);
    }, 1600);

    return () => window.clearInterval(interval);
  }, [active, availableAssets.length]);

  const markAssetFailed = (sourceIndex: number) => {
    setFailedAssets((current) => new Set(current).add(sourceIndex));
    setAssetIndex(0);
  };

  const previewLabel = currentAsset
    ? currentAsset.alt
    : `${getProjectFileType(project.tags)} project file preview for ${project.title}`;

  return (
    <div className="project-folder-stage" role="img" aria-label={previewLabel}>
      <div className="project-folder-back">
        <span className="project-folder-tab" />
      </div>

      <div className="project-folder-file">
        {currentAsset ? (
          <div
            key={`${currentEntry.sourceIndex}-${currentAsset.src}`}
            className="project-folder-media absolute inset-0"
          >
            {currentAsset.type === "image" ? (
              <Image
                src={currentAsset.src}
                alt=""
                fill
                sizes="(max-width: 639px) calc(100vw - 96px), 150px"
                unoptimized={currentAsset.src.toLowerCase().endsWith(".gif")}
                className="object-cover"
                style={{ objectPosition: currentAsset.focalPoint ?? "50% 50%" }}
                onError={() => markAssetFailed(currentEntry.sourceIndex)}
              />
            ) : (
              <FolderVideo
                asset={currentAsset}
                active={active}
                onError={() => markAssetFailed(currentEntry.sourceIndex)}
              />
            )}
          </div>
        ) : (
          <ProjectFileFallback project={project} />
        )}
      </div>

      <div className="project-folder-front">
        <span className="max-w-[80%] truncate text-[10px] font-bold uppercase tracking-[0.16em] opacity-55">
          {project.category.replace(" Projects", "")}
        </span>
        {availableAssets.length > 1 && (
          <span className="ml-auto text-[9px] font-bold tabular-nums opacity-45">
            {(assetIndex % availableAssets.length) + 1}/{availableAssets.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProjectFolderCard({ project }: { project: Project }) {
  const [previewActive, setPreviewActive] = useState(false);

  return (
    <article
      className="project-folder-card group"
      onMouseEnter={() => setPreviewActive(true)}
      onMouseLeave={() => setPreviewActive(false)}
      onFocusCapture={() => setPreviewActive(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPreviewActive(false);
        }
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        aria-label={`View ${project.title} project details`}
      />

      <div className="pointer-events-none relative z-20">
        <ProjectFolderPreview project={project} active={previewActive} />
      </div>

      <div className="pointer-events-none relative z-20 min-w-0 self-center">
        <h3 className="mb-2 text-[17px] font-bold leading-snug text-black transition-colors group-hover:text-terracotta">
          {project.title}
        </h3>
        <p className="mb-4 text-[14px] leading-relaxed text-[#555]">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border bg-cream px-2 py-0.5 text-[11px] font-medium text-[#666]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pointer-events-auto relative z-30 flex flex-wrap gap-x-4 gap-y-2">
          {project.links.map((projectLink) => (
            <a
              key={`${project.slug}-${projectLink.label}`}
              href={projectLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[12.5px] font-medium text-terracotta transition-colors hover:text-terracotta-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              {projectLink.label}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
