"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { ArticleGridCard } from "./ArticleGridCard";
import { Post, PostSummary } from "@/lib/posts";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  LayoutList,
  LayoutGrid,
} from "lucide-react";

interface ArticleListProps {
  posts: (Post | PostSummary)[];
  postsPerPage?: number;
}

export function ArticleList({
  posts,
  postsPerPage = 6,
}: ArticleListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("blog_view_mode");
    if (saved === "grid" || saved === "list") {
      setViewMode(saved);
    }
  }, []);

  const handleToggleView = (mode: "list" | "grid") => {
    setViewMode(mode);
    try {
      localStorage.setItem("blog_view_mode", mode);
    } catch {}
  };

  // Filter posts based solely on search query across title, excerpt, and SEO tags
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return posts;

    return posts.filter((post) => {
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt
        ? post.excerpt.toLowerCase().includes(q)
        : false;
      const matchTags = Array.isArray(post.tags)
        ? post.tags.some((t) => t.toLowerCase().includes(q))
        : false;

      return matchTitle || matchExcerpt || matchTags;
    });
  }, [posts, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  return (
    <div className="w-full space-y-6">
      {/* Search & View Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-on-surface-variant/70" />
          <input
            type="text"
            placeholder="Search essays by title, keyword, or topic…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 w-full rounded-[4px] border border-border/80 bg-surface/80 pl-9 pr-9 text-xs font-mono text-foreground placeholder:text-on-surface-variant/60 focus:border-foreground focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-foreground cursor-pointer"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* View Toggle (List vs Grid) */}
        {mounted && (
          <div className="flex items-center gap-1 border border-border/80 bg-surface/80 p-1 rounded-[4px] self-end sm:self-auto">
            <button
              onClick={() => handleToggleView("list")}
              className={`p-1.5 rounded-[2px] transition-colors cursor-pointer touch-manipulation ${
                viewMode === "list"
                  ? "bg-foreground text-background"
                  : "text-on-surface-variant hover:text-foreground"
              }`}
              title="List view"
              aria-label="List view"
            >
              <LayoutList className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleToggleView("grid")}
              className={`p-1.5 rounded-[2px] transition-colors cursor-pointer touch-manipulation ${
                viewMode === "grid"
                  ? "bg-foreground text-background"
                  : "text-on-surface-variant hover:text-foreground"
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant border-b border-border/60 pb-3">
        <div>
          {searchQuery ? (
            <span>
              Showing {filteredPosts.length} result
              {filteredPosts.length === 1 ? "" : "s"} for &ldquo;{searchQuery}&rdquo;
            </span>
          ) : (
            <span>
              {posts.length} {posts.length === 1 ? "Essay" : "Essays"} Published by Ugandhar Vaddi
            </span>
          )}
        </div>

        <div>
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[4px] border border-dashed border-border/80 bg-surface/30 p-12 text-center">
          <BookOpen className="h-8 w-8 text-on-surface-variant/50 mb-3" />
          <h3 className="font-serif text-lg font-bold text-foreground">
            No matching essays found
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant max-w-sm font-sans">
            No articles match your query &ldquo;{searchQuery}&rdquo;. Try searching for terms like Android, ADB, McKinsey, Python, or Systems.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setCurrentPage(1);
            }}
            className="mt-4 px-3 py-1.5 rounded-[2px] bg-foreground text-background font-mono text-xs font-medium uppercase tracking-wider hover:bg-foreground/90 transition-colors cursor-pointer touch-manipulation"
          >
            Clear Search
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid View Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {paginatedPosts.map((post) => (
            <ArticleGridCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        /* List View Layout */
        <div className="divide-y divide-border/80 border-y border-border/80">
          {paginatedPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border/80 pt-6">
          <button
            onClick={() => {
              setCurrentPage((p) => Math.max(p - 1, 1));
              const el = document.getElementById("articles");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[3px] border border-border/80 bg-surface/60 font-mono text-xs text-on-surface-variant hover:text-foreground hover:border-foreground disabled:opacity-40 disabled:hover:border-border/80 disabled:cursor-not-allowed transition-colors cursor-pointer touch-manipulation"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          <div className="text-xs font-mono text-on-surface-variant">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => {
              setCurrentPage((p) => Math.min(p + 1, totalPages));
              const el = document.getElementById("articles");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[3px] border border-border/80 bg-surface/60 font-mono text-xs text-on-surface-variant hover:text-foreground hover:border-foreground disabled:opacity-40 disabled:hover:border-border/80 disabled:cursor-not-allowed transition-colors cursor-pointer touch-manipulation"
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
