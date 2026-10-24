"use client";

import React from "react";
import { Youtube, ExternalLink, Play, Sparkles } from "lucide-react";
import { YOUTUBE_INFO } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

export function MediaSection() {
  return (
    <section id="media" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-mono text-foreground font-medium">
          <Youtube className="w-3.5 h-3.5 text-red-500" />
          <span>YouTube & Technical Tutorials</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Technical Walkthroughs & Deep-Dives
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1">
              Hands-on coding series, data analytics workshops, touch typing sessions, and creative experiments.
            </p>
          </div>

          <a
            href={YOUTUBE_INFO.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs font-mono transition-all self-start sm:self-auto hover:opacity-90 shadow-sm"
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span>Visit @uga961</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Featured & Latest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {YOUTUBE_INFO.items.map((item) => (
          <SpotlightCard
            key={item.title}
            className="h-full flex flex-col justify-between p-6 space-y-4 border-outline-variant/40 hover:border-foreground/50"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/40 text-foreground">
                    {item.badge}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30 text-on-surface-variant">
                    {item.type}
                  </span>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-on-surface-variant hover:text-foreground flex items-center gap-1"
                >
                  <span>Open {item.type}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <h3 className="text-lg font-bold text-foreground leading-snug">
                {item.title}
              </h3>

              <p className="text-sm text-foreground/85 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            <div className="space-y-4 pt-3 border-t border-outline-variant/30">
              <div className="flex flex-wrap gap-1.5">
                {item.topics.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest/80 border border-outline-variant/40 text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface/90 hover:bg-white dark:hover:bg-surface-container-highest text-foreground text-xs font-mono font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-outline-variant/50 hover:border-foreground/50 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch {item.type}</span>
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
