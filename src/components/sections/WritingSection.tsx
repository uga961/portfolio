"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { BlogPost, BLOG_POSTS, PERSONAL_INFO } from "@/data/portfolio";

interface WritingSectionProps {
  initialPosts?: BlogPost[];
}

export function WritingSection({ initialPosts = BLOG_POSTS }: WritingSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts.slice(0, 2));
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/blog")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: BlogPost[] | null) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setPosts(data.slice(0, 2));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshPosts = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/blog?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data: BlogPost[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data.slice(0, 2));
        }
      }
    } catch (e) {
      console.warn("Manual feed sync fallback", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <section id="writing" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Editorial Header */}
      <div className="border-b border-border/80 pb-4 text-xs font-mono text-on-surface-variant flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="text-foreground font-semibold uppercase tracking-wider flex-shrink-0">INDEX 006</span>
          <span className="text-border flex-shrink-0">/</span>
          <span className="truncate">WRITING &amp; NOTES</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-[11px] flex-shrink-0">
          <button
            onClick={refreshPosts}
            disabled={isRefreshing}
            className="text-on-surface-variant hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer touch-manipulation"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-foreground" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Sync RSS"}</span>
          </button>
          <span className="text-border">/</span>
          <a
            href={`https://${PERSONAL_INFO.blogDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground hover:underline transition-colors flex items-center gap-0.5 touch-manipulation"
          >
            <span>{PERSONAL_INFO.blogDomain}</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

      <div className="pt-8 sm:pt-10 pb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans uppercase">
          Technical Journal
        </h2>
        <p className="mt-2 text-sm sm:text-base text-on-surface-variant font-sans max-w-xl">
          Long-form essays on data manipulation workflows, technical interviews, performance engineering, and system optimizations.
        </p>
      </div>

      {/* Editorial List of Essays */}
      <div className="divide-y divide-border/80 border-t border-border/80">
        {posts.map((post) => {
          const targetUrl = post.url.replace(
            /^https?:\/\/blog\.ugandhar\.in/i,
            `https://${PERSONAL_INFO.blogDomain}`
          );
          return (
            <a
              key={post.title}
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group block touch-manipulation"
            >
            {/* Left Column: Metadata */}
            <div className="md:col-span-4 space-y-1 text-xs font-mono text-on-surface-variant">
              <div className="text-foreground font-semibold">
                {post.date}
              </div>
              <div>
                {post.readTime}
              </div>
            </div>

            {/* Right Column: Title, Excerpt, Tags, Arrow */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground group-hover:underline transition-colors leading-snug break-words">
                  {post.title}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                {post.excerpt}
              </p>

              {/* Tags (Real unicode middle dot with break-words) */}
              <div className="pt-1 text-xs font-mono text-on-surface-variant/80 break-words">
                <span>{post.tags.join(" · ")}</span>
              </div>
            </div>
          </a>
          );
        })}
      </div>
    </section>
  );
}
