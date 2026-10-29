"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Copy, Check, FileText } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolio";

export function HeroSection() {
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
      className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      {/* Top Editorial Index & Category Bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3 text-xs font-mono text-on-surface-variant">
        <div className="flex items-center gap-3">
          <span className="text-foreground font-semibold uppercase tracking-wider">INDEX 001</span>
          <span className="text-border">/</span>
          <span>ENGINEERING &amp; APPLIED RESEARCH</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/40" />
          <span>BASED IN INDIA</span>
        </div>
      </div>

      {/* Main Grid: Editorial Typography & Grounded Photographic Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-8 sm:pt-12 items-start">
        {/* Left Column: Title, Mandate, Narrative, Actions */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-sans uppercase">
              Ugandhar Vaddi
            </h1>
            <p className="mt-3 text-xl sm:text-2xl font-serif italic text-foreground/80 leading-snug">
              Silicon, Systems &amp; Applied Machine Learning.
            </p>
          </div>

          <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed font-sans max-w-xl">
            <p>
              Associate Data Scientist at{" "}
              <span className="text-foreground font-medium">Tredence</span> (Analytics &amp; Applied AI) and graduate in Electronics &amp; Communication from Sathyabama Institute of Science and Technology.
            </p>
            <p>
              I build and investigate systems across the technical stack &mdash; from transistor-level SRAM stability architectures in Cadence Virtuoso and embedded telemetry firmware to enterprise predictive pipelines, multi-agent AI tooling, and native Windows utilities.
            </p>
          </div>

          {/* Direct, Purposeful Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-foreground text-background font-medium text-xs font-mono uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] border border-border/90 bg-surface/80 text-foreground font-mono text-xs hover:border-foreground transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-on-surface-variant" />
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-on-surface-variant" />
            </a>

            <button
              onClick={handleCopyEmail}
              title="Copy direct email address"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] border border-border/90 bg-surface/80 text-foreground font-mono text-xs hover:border-foreground transition-colors"
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

          {/* Clean slash-separated text links */}
          <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-on-surface-variant">
            {SOCIAL_LINKS.map((link, idx) => (
              <React.Fragment key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground hover:underline transition-colors flex items-center gap-1"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
                {idx < SOCIAL_LINKS.length - 1 && (
                  <span className="text-border select-none">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Column: Architectural Photograph Frame */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="w-full max-w-sm border border-border bg-surface p-3 rounded-[4px] shadow-subtle">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container rounded-[2px]">
              <Image
                src={PERSONAL_INFO.avatarPath}
                alt="Portrait of Ugandhar Vaddi"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              />
            </div>
            <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
              <span>FIG. 01 — RESEARCHER</span>
              <span className="text-foreground/90 font-medium">CHENNAI · VISAKHAPATNAM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
