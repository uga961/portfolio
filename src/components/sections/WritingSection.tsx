"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ExternalLink, ArrowRight, Clock, Calendar, RefreshCw } from "lucide-react";
import { BlogPost, BLOG_POSTS, PERSONAL_INFO } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

interface WritingSectionProps {
  initialPosts?: BlogPost[];
}

export function WritingSection({ initialPosts = BLOG_POSTS }: WritingSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshPosts = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("https://blog.ugandhar.in/feed.xml", { cache: "no-store" });
      if (res.ok) {
        const xml = await res.text();
        const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
        const fetched: BlogPost[] = [];
        let match: RegExpExecArray | null;

        while ((match = itemRegex.exec(xml)) !== null && fetched.length < 6) {
          const content = match[1];
          const title = /<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i.exec(content);
          const link = /<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/i.exec(content);
          const desc = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i.exec(content);
          const date = /<pubDate>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/pubDate>/i.exec(content);

          if (title && link) {
            let cleanDesc = (desc ? desc[1] : "")
              .replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            if (cleanDesc.length > 170) cleanDesc = cleanDesc.substring(0, 167) + "...";

            let dateStr = "Recent";
            if (date) {
              try {
                dateStr = new Date(date[1]).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              } catch {
                dateStr = date[1];
              }
            }

            fetched.push({
              title: title[1].trim(),
              url: link[1].trim(),
              excerpt: cleanDesc || "Read the complete technical essay on blog.ugandhar.in.",
              date: dateStr,
              readTime: `${Math.max(5, Math.min(25, Math.ceil(cleanDesc.length / 15)))} min read`,
              tags: ["Engineering", "Tech", "Notes"],
            });
          }
        }
        if (fetched.length > 0) setPosts(fetched);
      }
    } catch (e) {
      console.log("Feed check fallback used", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <section id="writing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-10 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-xs font-mono text-emerald-700 dark:text-emerald-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Journal · Live RSS Feed</span>
          </div>

          <button
            onClick={refreshPosts}
            disabled={isRefreshing}
            title="Refresh feed from blog.ugandhar.in"
            className="text-xs font-mono text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
            <span>Sync Live</span>
          </button>
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
        {posts.map((post) => (
          <a
            key={post.title}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <SpotlightCard className="h-full flex flex-col justify-between p-6 space-y-4 group-hover:border-primary/60 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-primary font-medium">
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
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest/60 text-on-surface"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-mono text-primary group-hover:translate-x-1 transition-transform font-medium">
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
