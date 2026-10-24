"use client";

import React from "react";
import { Youtube, ExternalLink, Play, Video, Film, Sparkles } from "lucide-react";
import { YOUTUBE_INFO } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

export function MediaSection() {
  return (
    <section id="media" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-xs font-mono text-red-400">
          <Youtube className="w-3.5 h-3.5 text-red-500" />
          <span>YouTube & Creative Media</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Teaching, Experiments & Storytelling
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          On my channel, I break down programming concepts, share hands-on Python/Pandas tutorials, practice speed typing, and craft creative films.
        </p>
      </div>

      <SpotlightCard className="p-6 sm:p-8 border-red-500/20 hover:border-red-500/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {YOUTUBE_INFO.channelName}
                </h3>
                <div className="text-xs font-mono text-on-surface-variant">
                  {YOUTUBE_INFO.handle} • Engineering & Creative Hub
                </div>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              {YOUTUBE_INFO.description}
            </p>

            {/* Featured Channel Topics */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                Featured Content & Playlists
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {YOUTUBE_INFO.featuredTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant/20 text-xs font-mono text-on-surface"
                  >
                    <Play className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={YOUTUBE_INFO.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-xs font-mono transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
              >
                <Youtube className="w-4 h-4" />
                <span>Visit Channel ({YOUTUBE_INFO.handle})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <span className="text-xs font-mono text-on-surface-variant/80">
                New videos & tutorials published periodically
              </span>
            </div>
          </div>

          {/* Creative visual card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shadow-inner">
              <Film className="w-8 h-8 text-red-400 animate-pulse-subtle" />
            </div>

            <div>
              <div className="text-sm font-bold text-foreground">
                Creative Expression & Short Films
              </div>
              <div className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Directed and produced independent Telugu short films including <em>The Fake</em>, exploring cinematography, editing, and pacing.
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-surface-container-highest text-primary">
              <Sparkles className="w-3 h-3" />
              <span>Silicon · Software · Cinema</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
