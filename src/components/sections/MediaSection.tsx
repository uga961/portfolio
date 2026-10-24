"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Youtube, ExternalLink, Play, Film, Sparkles, Terminal } from "lucide-react";
import { YOUTUBE_INFO, YouTubeVideo } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

type VideoCategory = "All" | "Python Series" | "Data Science" | "Speed Typing";

export function MediaSection() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>("All");

  const categories: VideoCategory[] = [
    "All",
    "Python Series",
    "Data Science",
    "Speed Typing",
  ];

  const filteredVideos =
    selectedCategory === "All"
      ? YOUTUBE_INFO.featuredVideos
      : YOUTUBE_INFO.featuredVideos.filter((v) => v.category === selectedCategory);

  return (
    <section id="media" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-xs font-mono text-red-600 dark:text-red-400">
          <Youtube className="w-3.5 h-3.5 text-red-500" />
          <span>YouTube Channel & Workshops</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Teaching, Tutorials & Experiments
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1">
              Hands-on Python tutorials, Pandas data manipulation walkthroughs, typing speed sessions, and short film experiments.
            </p>
          </div>

          <a
            href={YOUTUBE_INFO.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-xs font-mono transition-all self-start sm:self-auto hover:scale-105 shadow-sm"
          >
            <Youtube className="w-4 h-4" />
            <span>Visit @uga961</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCategory === cat
                ? "bg-red-600 text-white font-semibold shadow-sm"
                : "bg-surface-container/60 border border-outline-variant/20 text-on-surface-variant hover:text-foreground hover:bg-surface-container-high"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid with Real YouTube Links & Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block focus:outline-none"
          >
            <SpotlightCard className="h-full flex flex-col justify-between p-4 space-y-3 border-outline-variant/30 hover:border-red-500/50 group-hover:shadow-glow-sm">
              <div className="space-y-3">
                {/* Thumbnail container with play button overlay */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-surface-container-highest border border-outline-variant/30">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-white font-medium">
                    {video.date}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-red-500 font-semibold">
                    {video.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-red-500 transition-colors" />
              </div>
            </SpotlightCard>
          </a>
        ))}
      </div>

      {/* Filmmaking & creative narrative spotlight */}
      <div className="mt-8 p-5 rounded-2xl bg-surface-container/40 border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-red-400 flex-shrink-0">
            <Film className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">
              Independent Short Films & Storytelling
            </div>
            <div className="text-[11px] text-on-surface-variant mt-0.5">
              Directed and produced creative projects like <em>The Fake</em>, exploring pacing, visuals, and cinematography.
            </div>
          </div>
        </div>

        <a
          href={YOUTUBE_INFO.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-red-500 hover:underline flex items-center gap-1 flex-shrink-0"
        >
          <span>Explore creative portfolio</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
