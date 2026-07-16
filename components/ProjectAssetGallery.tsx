"use client";

import { useState } from "react";
import Image from "next/image";
import { FiImage } from "react-icons/fi";
import type { ProjectAsset } from "@/lib/data";

function isMotionAsset(asset: ProjectAsset) {
  return asset.type === "video" || asset.src.toLowerCase().endsWith(".gif");
}

export default function ProjectAssetGallery({ assets }: { assets?: ProjectAsset[] }) {
  const [failedAssets, setFailedAssets] = useState<Set<number>>(() => new Set());

  if (!assets?.length) return null;

  const markAssetFailed = (index: number) => {
    setFailedAssets((current) => new Set(current).add(index));
  };

  const orderedAssets = assets
    .map((asset, sourceIndex) => ({ asset, sourceIndex }))
    .sort((first, second) => {
      const firstIsMotion = isMotionAsset(first.asset);
      const secondIsMotion = isMotionAsset(second.asset);

      if (firstIsMotion === secondIsMotion) return 0;
      return firstIsMotion ? -1 : 1;
    });
  const hasMotionAssets = assets.some(isMotionAsset);

  return (
    <section className="mb-12 border-t border-border pt-12" aria-labelledby="project-gallery-title">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 id="project-gallery-title" className="text-[15px] font-bold text-black">
          Project gallery
        </h2>
        <span className="text-[11px] tabular-nums text-[#888]">
          {assets.length} {assets.length === 1 ? "asset" : "assets"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {orderedAssets.map(({ asset, sourceIndex }, displayIndex) => {
          const spansFullWidth =
            isMotionAsset(asset) || (!hasMotionAssets && displayIndex === 0);

          return (
            <figure
              key={`${sourceIndex}-${asset.type}-${asset.src}`}
              aria-labelledby={`project-asset-caption-${sourceIndex}`}
              className={`overflow-hidden rounded-xl border border-border/60 bg-white/45 ${
                spansFullWidth ? "sm:col-span-2" : ""
              }`}
            >
              <div className={`relative bg-black/5 ${spansFullWidth ? "aspect-video" : "aspect-[4/3]"}`}>
              {failedAssets.has(sourceIndex) ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#888]">
                  <FiImage aria-hidden="true" className="text-[25px]" />
                  <span className="text-[11px]">Media unavailable</span>
                </div>
              ) : asset.type === "image" ? (
                <Image
                  src={asset.src}
                  alt=""
                  fill
                  sizes={spansFullWidth ? "(max-width: 720px) 100vw, 672px" : "(max-width: 640px) 100vw, 328px"}
                  unoptimized={asset.src.toLowerCase().endsWith(".gif")}
                  className="object-contain"
                  style={{ objectPosition: asset.focalPoint ?? "50% 50%" }}
                  onError={() => markAssetFailed(sourceIndex)}
                />
              ) : (
                <video
                  src={asset.src}
                  poster={asset.poster}
                  controls
                  playsInline
                  preload="none"
                  className="h-full w-full object-contain"
                  style={{ objectPosition: asset.focalPoint ?? "50% 50%" }}
                  onError={() => markAssetFailed(sourceIndex)}
                />
              )}
            </div>
            <figcaption
              id={`project-asset-caption-${sourceIndex}`}
              className="border-t border-border/60 px-3 py-2 text-[11px] leading-relaxed text-[#777]"
            >
              {asset.alt}
            </figcaption>
          </figure>
          );
        })}
      </div>
    </section>
  );
}
