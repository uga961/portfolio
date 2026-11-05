"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { formatDisplayDate } from "@/lib/date";

export interface WritingItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number | string;
  tags: string[];
}

interface WritingSectionProps {
  initialPosts?: WritingItem[];
}

export function WritingSection({
  initialPosts = [],
}: WritingSectionProps) {
  const displayPosts = initialPosts.slice(0, 3);

  return (
    <section
      id="writing"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="border-b border-border/80 pb-4 text-xs font-mono text-on-surface-variant flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="text-foreground font-semibold uppercase tracking-wider flex-shrink-0">
            INDEX 006
          </span>
          <span className="text-border flex-shrink-0">/</span>
          <span className="truncate">WRITING &amp; NOTES</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-[11px] flex-shrink-0">
          <Link
            href="/blog"
            className="hover:text-foreground hover:underline transition-colors flex items-center gap-0.5 touch-manipulation"
          >
            <span>ugandhar.in/blog</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </Link>
        </div>
      </div>

      <div className="pt-8 sm:pt-10 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans uppercase">
            Technical Journal
          </h2>
          <p className="mt-2 text-sm sm:text-base text-on-surface-variant font-sans max-w-xl">
            Long-form essays on data manipulation workflows, technical interviews,
            performance engineering, and system optimizations.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-foreground hover:underline"
        >
          <span>All Essays ({initialPosts.length})</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
        </Link>
      </div>

      {/* Editorial List of Essays */}
      <div className="divide-y divide-border/80 border-t border-border/80">
        {displayPosts.map((post) => {
          const displayDate = formatDisplayDate(post.date, "short");
          const readTimeStr =
            typeof post.readingTime === "number"
              ? `${post.readingTime} min read`
              : post.readingTime;

          return (
            <Link
              key={post.slug || post.title}
              href={`/blog/posts/${post.slug}`}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group block touch-manipulation"
            >
              {/* Left Column: Metadata */}
              <div className="md:col-span-4 space-y-1 text-xs font-mono text-on-surface-variant">
                <div className="text-foreground font-semibold">
                  <time dateTime={post.date} suppressHydrationWarning>
                    {displayDate}
                  </time>
                </div>
                <div>{readTimeStr}</div>
              </div>

              {/* Right Column: Title, Excerpt, Tags, Arrow */}
              <div className="md:col-span-8 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground group-hover:underline transition-colors leading-snug break-words">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed font-sans line-clamp-2 sm:line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags (Real unicode middle dot with break-words) */}
                {post.tags && post.tags.length > 0 && (
                  <div className="pt-1 text-xs font-mono text-on-surface-variant/80 break-words">
                    <span>{post.tags.join(" · ")}</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer link to view full journal */}
      <div className="pt-8 border-t border-border/80 flex items-center justify-between">
        <span className="text-xs font-mono text-on-surface-variant">
          File-based markdown journal with syntax highlighting &amp; zero DB overhead
        </span>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[3px] border border-border/90 bg-surface/80 text-foreground font-mono text-xs hover:border-foreground transition-colors touch-manipulation"
        >
          <BookOpen className="w-3.5 h-3.5 text-on-surface-variant" />
          <span>Browse All Essays</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-on-surface-variant" />
        </Link>
      </div>
    </section>
  );
}
