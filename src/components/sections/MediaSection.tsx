"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { YOUTUBE_INFO } from "@/data/portfolio";

export function MediaSection() {
  return (
    <section id="media" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-border/80 pb-4 text-xs font-mono text-on-surface-variant flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-foreground font-semibold uppercase tracking-wider">INDEX 007</span>
          <span className="text-border">/</span>
          <span>TECHNICAL WORKSHOPS</span>
        </div>
        <a
          href={YOUTUBE_INFO.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground hover:underline transition-colors flex items-center gap-1 font-mono text-[11px]"
        >
          <span>{YOUTUBE_INFO.handle} ON YOUTUBE</span>
          <ArrowUpRight className="w-3 h-3 opacity-60" />
        </a>
      </div>

      <div className="pt-8 sm:pt-10 pb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans uppercase">
          Video Tutorials
        </h2>
        <p className="mt-2 text-sm sm:text-base text-on-surface-variant font-sans max-w-xl">
          Hands-on Python analytics series, Google Colab notebooks, and end-to-end data manipulation sessions.
        </p>
      </div>

      {/* Grid of 2 Workshops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/80 pt-8 sm:pt-10">
        {YOUTUBE_INFO.items.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block space-y-3 p-5 sm:p-6 border border-border/80 bg-surface/60 rounded-[4px] hover:border-foreground/40 hover:bg-surface transition-all"
          >
            <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
              <span className="text-foreground font-medium uppercase tracking-wider">
                {item.badge} {item.type}
              </span>
              <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-foreground font-sans group-hover:underline leading-snug">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-sans">
              {item.description}
            </p>

            <div className="pt-2 border-t border-border/40 text-xs font-mono text-on-surface-variant/80">
              <span>{item.topics.join(" &middot; ")}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
