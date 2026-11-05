"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Copy, Check, Home } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio";

export function HeroBanner({ totalPosts }: { totalPosts: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  return (
    <section
      id="hero"
      className="w-full pt-24 sm:pt-36 pb-16 sm:pb-20 overflow-hidden"
    >
      {/* Top Editorial Index Bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3 text-xs font-mono text-on-surface-variant">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="text-foreground font-semibold uppercase tracking-wider flex-shrink-0">
            INDEX 001
          </span>
          <span className="text-border flex-shrink-0">/</span>
          <span className="truncate">TECHNICAL JOURNAL, ESSAYS &amp; NOTES</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0 font-mono text-[11px]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span>
            {totalPosts} {totalPosts === 1 ? "ESSAY" : "ESSAYS"} PUBLISHED
          </span>
        </div>
      </div>

      {/* Main Grid: Typography & Author Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pt-8 sm:pt-12 items-start">
        {/* Left Column: Title, Tagline, Bio, Actions */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7">
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-sans uppercase break-words">
              {PERSONAL_INFO.name}
            </h1>
            <p className="mt-2.5 sm:mt-3 text-base sm:text-xl font-serif italic text-foreground/80 leading-snug">
              Technical Journal &amp; System Engineering Notes.
            </p>
          </div>

          <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed font-sans max-w-xl">
            <p>
              In-depth essays, post-mortems, and engineering walkthroughs exploring data science pipelines, embedded firmware, Linux kernel internals, and native desktop utilities.
            </p>
          </div>

          {/* Direct Actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <a
              href="#articles"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-[4px] bg-foreground text-background font-medium text-xs font-mono uppercase tracking-wider hover:bg-foreground/90 transition-colors touch-manipulation min-h-[40px]"
            >
              <span>Explore Essays</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] border border-border/90 bg-surface/80 text-foreground font-mono text-xs hover:border-foreground transition-colors touch-manipulation min-h-[40px]"
            >
              <Home className="w-3.5 h-3.5 text-on-surface-variant" />
              <span>Portfolio Home</span>
            </Link>

            <button
              onClick={handleCopyEmail}
              title="Copy direct email address"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] border border-border/90 bg-surface/80 text-foreground font-mono text-xs hover:border-foreground transition-colors touch-manipulation min-h-[40px] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-foreground" />
                  <span className="text-foreground font-semibold">Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-on-surface-variant" />
                  <span>{PERSONAL_INFO.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Photograph Frame matching portfolio */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full">
          <div className="w-full max-w-[280px] sm:max-w-sm border border-border bg-surface p-2.5 sm:p-3 rounded-[4px] shadow-subtle">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container rounded-[2px]">
              <Image
                src={PERSONAL_INFO.avatarPath}
                alt="Portrait of Ugandhar Vaddi"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 380px"
                className="object-cover transition-opacity duration-500"
              />
            </div>
            <div className="mt-2.5 sm:mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-on-surface-variant">
              <span>FIG. 01 — AUTHOR</span>
              <span className="text-foreground/90 font-medium">CHENNAI, INDIA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
