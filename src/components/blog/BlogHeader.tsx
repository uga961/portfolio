import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Rss, Home, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface BlogHeaderProps {
  backTo?: string;
  backLabel?: string;
}

export function BlogHeader({
  backTo,
  backLabel,
}: BlogHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 py-3 bg-background/95 sm:bg-background/90 sm:backdrop-blur-md border-b border-border/80 transition-colors gpu-layer">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand identity — ALWAYS links to /blog within the blog section */}
        <Link href="/blog" className="flex items-center gap-3 group touch-manipulation">
          <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
            <Image
              src="/icon-sm.png"
              alt={PERSONAL_INFO.name}
              width={24}
              height={24}
              priority
              className="w-full h-full object-contain rounded-[2px]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider uppercase text-foreground group-hover:underline leading-none">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] font-mono text-on-surface-variant mt-0.5 leading-none">
              {PERSONAL_INFO.domain}/blog
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links for Blog */}
        <nav
          aria-label="Blog Navigation"
          className="hidden md:flex items-center gap-5 text-xs font-mono text-on-surface-variant"
        >
          {backTo ? (
            <Link
              href={backTo}
              className="flex items-center gap-1.5 text-foreground font-semibold hover:underline transition-colors touch-manipulation"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{backLabel || "All Essays"}</span>
            </Link>
          ) : (
            <>
              <a
                href="#featured"
                className="hover:text-foreground hover:underline transition-colors touch-manipulation"
              >
                Featured
              </a>
              <a
                href="#articles"
                className="hover:text-foreground hover:underline transition-colors touch-manipulation"
              >
                All Essays
              </a>
            </>
          )}

          <div className="w-[1px] h-3.5 bg-border/80 flex-shrink-0" />

          <Link
            href="/"
            className="hover:text-foreground hover:underline transition-colors flex items-center gap-1 touch-manipulation"
          >
            <Home className="w-3 h-3 opacity-70" />
            <span>Portfolio</span>
          </Link>

          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RSS Feed"
            title="RSS Feed"
            className="hover:text-foreground hover:underline transition-colors flex items-center gap-1 touch-manipulation"
          >
            <Rss className="w-3 h-3 opacity-70" />
            <span>RSS</span>
            <ArrowUpRight className="w-2.5 h-2.5 opacity-50" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
