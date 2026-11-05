"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  BookOpen,
  ArrowUp,
  Sparkles,
  Rss,
  Share2,
  Check,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

interface BlogDockProps {
  mode: "index" | "post";
  postTitle?: string;
  postUrl?: string;
  className?: string;
}

export function BlogDock({
  mode,
  postTitle,
  postUrl,
  className,
}: BlogDockProps) {
  const [copied, setCopied] = useState(false);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const url = postUrl || window.location.href;
    const title = postTitle || "Ugandhar Vaddi — Technical Journal";

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      className={cn(
        "fixed bottom-3 sm:bottom-4 inset-x-0 z-50 flex items-center justify-center pointer-events-none",
        className
      )}
    >
      <nav
        aria-label="Blog Quick Navigation"
        className="pointer-events-auto flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-[4px] border border-border/90 bg-background/95 sm:bg-background/90 sm:backdrop-blur-md shadow-subtle text-xs font-mono gpu-layer"
      >
        {mode === "index" ? (
          <>
            <Link
              href="/"
              aria-label="Back to Portfolio"
              title="Portfolio Homepage"
              className="flex items-center gap-1.5 px-2 py-1 rounded-[2px] text-on-surface-variant hover:text-foreground hover:bg-surface-subtle transition-colors touch-manipulation"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Portfolio</span>
            </Link>

            <button
              onClick={handleScrollTop}
              aria-label="Scroll to top"
              title="Scroll to top"
              className="flex items-center gap-1.5 px-2 py-1 rounded-[2px] text-on-surface-variant hover:text-foreground hover:bg-surface-subtle transition-colors touch-manipulation cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Top</span>
            </button>

            <Link
              href="#featured"
              aria-label="Featured Story"
              title="Featured Essay"
              className="flex items-center gap-1.5 px-2 py-1 rounded-[2px] text-on-surface-variant hover:text-foreground hover:bg-surface-subtle transition-colors touch-manipulation"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Featured</span>
            </Link>

            <Link
              href="#articles"
              aria-label="All Essays"
              title="All Essays"
              className="flex items-center gap-1.5 px-2 py-1 rounded-[2px] text-on-surface-variant hover:text-foreground hover:bg-surface-subtle transition-colors touch-manipulation"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Essays</span>
            </Link>

            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RSS Feed"
              title="RSS Feed"
              className="flex items-center gap-1.5 px-2 py-1 rounded-[2px] text-on-surface-variant hover:text-foreground hover:bg-surface-subtle transition-colors touch-manipulation"
            >
              <Rss className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">RSS</span>
            </a>
          </>
        ) : (
          <>
            <Link
              href="/blog"
              aria-label="Back to Blog"
              title="All Essays"
              className="flex items-center gap-1.5 px-2 py-1 rounded-[2px] text-foreground font-semibold hover:bg-surface-subtle transition-colors touch-manipulation"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">All Essays</span>
            </Link>

            <button
              onClick={handleScrollTop}
              aria-label="Scroll to top"
              title="Scroll to top"
              className="flex items-center gap-1.5 px-2 py-1 rounded-[2px] text-on-surface-variant hover:text-foreground hover:bg-surface-subtle transition-colors touch-manipulation cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Top</span>
            </button>

            <Link
              href="/"
              aria-label="Back to Portfolio"
              title="Portfolio Homepage"
              className="flex items-center gap-1.5 px-2 py-1 rounded-[2px] text-on-surface-variant hover:text-foreground hover:bg-surface-subtle transition-colors touch-manipulation"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Portfolio</span>
            </Link>

            <button
              onClick={handleShare}
              aria-label="Share article"
              title={copied ? "Link copied to clipboard!" : "Share article"}
              className="flex items-center gap-1.5 px-2 py-1 rounded-[2px] text-on-surface-variant hover:text-foreground hover:bg-surface-subtle transition-colors touch-manipulation cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-foreground" />
                  <span className="hidden sm:inline text-[11px] text-foreground font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Share</span>
                </>
              )}
            </button>
          </>
        )}

        <div className="w-[1px] h-3.5 bg-border/80 mx-0.5 sm:mx-1 flex-shrink-0" />

        <ThemeToggle />
      </nav>
    </div>
  );
}
