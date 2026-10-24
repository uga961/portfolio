"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, FileText, ArrowUp, Globe, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolio";
import { SocialIcon } from "../ui/SocialIcons";
import { SpotlightCard } from "../ui/SpotlightCard";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#34d399", "#10b981", "#059669"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      <SpotlightCard className="p-8 sm:p-12 text-center space-y-6 border-primary/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-emerald-800 dark:text-primary font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground max-w-xl mx-auto">
          Let&apos;s build something extraordinary.
        </h2>

        <p className="text-sm sm:text-base text-on-surface-variant max-w-lg mx-auto leading-relaxed">
          Whether you want to discuss VLSI hardware, intelligent multi-agent AI systems, open-source desktop tooling, or collaborative opportunities — my inbox is always open.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Send an Email</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container border border-outline-variant/50 text-foreground text-sm font-mono hover:bg-surface-container-high hover:border-primary/50 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-primary" />
                <span className="text-primary font-bold">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-on-surface-variant" />
                <span>{PERSONAL_INFO.email}</span>
              </>
            )}
          </button>

          {/* View resume in new tab without downloading */}
          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container border border-outline-variant/50 text-foreground text-sm font-mono hover:bg-surface-container-high hover:border-primary/50 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4 text-primary" />
            <span>View Resume</span>
          </a>
        </div>

        <div className="pt-8 border-t border-outline-variant/20 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary" />
            {PERSONAL_INFO.location}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            Indian Standard Time (UTC+5:30)
          </span>
        </div>
      </SpotlightCard>

      {/* Bottom bar with socials and copyright */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-outline-variant/20 text-xs font-mono text-on-surface-variant">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <SocialIcon name={link.icon} className="w-3.5 h-3.5" />
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Ugandhar Vaddi. Build, Ship and Sleep.</span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-primary transition-colors border border-outline-variant/30"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
