"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ExternalLink, ArrowRight, Clock, Calendar, RefreshCw } from "lucide-react";
import { BlogPost, BLOG_POSTS, PERSONAL_INFO } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

interface WritingSectionProps {
  initialPosts?: BlogPost[];
}

export function WritingSection({ initialPosts = BLOG_POSTS }: WritingSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts.slice(0, 2));
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Proactively fetch live feed on mount to guarantee fresh content even if static ISR is serving
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
    <section id="writing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-10 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-mono text-foreground font-medium">
            <BookOpen className="w-3.5 h-3.5 text-foreground/80" />
            <span>Technical Journal · Live from Blog</span>
          </div>

          <button
            onClick={refreshPosts}
            disabled={isRefreshing}
            title="Refresh feed from blog.ugandhar.in"
            className="text-xs font-mono text-on-surface-variant hover:text-foreground transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 cursor-pointer active:scale-95"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-foreground" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Sync Live"}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Writing & Notes
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1">
              Reflections on data systems, engineering workflows, and lessons from building tools.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Latest Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <a
            key={post.title}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block focus:outline-none"
          >
            <SpotlightCard className="h-full flex flex-col justify-between p-5 sm:p-6 space-y-4 border-outline-variant/40 hover:border-foreground/50 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-foreground/70" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:underline transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest/80 text-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-mono text-foreground font-semibold group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </SpotlightCard>
          </a>
        ))}
      </div>

      {/* Prominent Redirect Button to Blog */}
      <div className="mt-8 p-6 rounded-2xl bg-surface-container/60 border border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-foreground">
            Want to read all articles and essays?
          </div>
          <div className="text-xs text-on-surface-variant mt-0.5">
            Visit the full personal blog with searchable archives, reading times, and interactive features.
          </div>
        </div>

        <a
          href={`https://${PERSONAL_INFO.blogDomain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs font-mono shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:bg-foreground/90 transition-all duration-200 flex-shrink-0 active:scale-95"
        >
          <span>Open {PERSONAL_INFO.blogDomain}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
