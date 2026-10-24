"use client";

import React from "react";
import { BookOpen, ExternalLink, ArrowRight, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS, PERSONAL_INFO } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

export function WritingSection() {
  return (
    <section id="writing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-xs font-mono text-emerald-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technical Journal</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Writing & Engineering Notes
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1">
              Essays on software engineering, data science, hardware experimentation, and lessons learned building real tools.
            </p>
          </div>

          <a
            href={`https://${PERSONAL_INFO.blogDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container border border-primary/40 text-primary hover:bg-surface-container-high hover:border-primary text-xs font-mono transition-all self-start sm:self-auto hover:scale-105"
          >
            <span>Open Blog ({PERSONAL_INFO.blogDomain})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post) => (
          <a
            key={post.title}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <SpotlightCard className="h-full flex flex-col justify-between p-6 space-y-4 group-hover:border-primary/60 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant/80">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-primary">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest/60 text-on-surface-variant"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-mono text-primary group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </SpotlightCard>
          </a>
        ))}
      </div>
    </section>
  );
}
