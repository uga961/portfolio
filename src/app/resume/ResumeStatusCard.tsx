"use client";

import React from "react";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolio";

export function ResumeStatusCard() {
  const linkedinLink = SOCIAL_LINKS.find((s) => s.name === "LinkedIn");

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      if (window.opener || window.history.length <= 1) {
        window.close();
        setTimeout(() => {
          window.location.href = "/";
        }, 100);
        return;
      }

      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <main className="min-h-screen bg-background text-on-surface flex items-center justify-center p-4 sm:p-6 relative selection:bg-foreground/15">
      <div className="relative z-10 max-w-lg w-full rounded-[4px] border border-border/90 bg-surface p-6 sm:p-8 space-y-6 text-center shadow-subtle">
        {/* Editorial Index */}
        <div className="border-b border-border/80 pb-3 text-xs font-mono text-on-surface-variant flex items-center justify-between">
          <span className="text-foreground font-semibold uppercase tracking-wider">CAREER RECORD</span>
          <span>STATUS NOTICE</span>
        </div>

        {/* Headline */}
        <div className="space-y-1.5 text-left">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans uppercase">
            Currently Committed
          </h1>
          <p className="text-xs font-mono text-on-surface-variant">
            {PERSONAL_INFO.name} &mdash; {PERSONAL_INFO.headline}
          </p>
        </div>

        {/* Informational Message Box */}
        <div className="p-4 rounded-[3px] bg-surface-subtle border border-border/80 text-left space-y-2 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-foreground/80 flex-shrink-0 mt-0.5" />
            <p>
              I am currently happy in my role and am <span className="font-semibold text-foreground">not actively seeking new roles or job opportunities</span> at this time.
            </p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="space-y-3 pt-2 text-left">
          <div className="text-xs font-mono text-on-surface-variant">
            Open for technical discussions, silicon architecture, or open-source dialogues:
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[3px] bg-foreground text-background text-xs font-mono uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[3px] border border-border/90 bg-surface/80 text-foreground text-xs font-mono hover:border-foreground transition-colors"
              >
                <FaLinkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Go Back / Close Tab Button */}
        <div className="pt-4 border-t border-border/80">
          <button
            onClick={handleGoBack}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[3px] border border-border/90 bg-surface-subtle hover:bg-surface hover:border-foreground text-foreground text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </div>
    </main>
  );
}
