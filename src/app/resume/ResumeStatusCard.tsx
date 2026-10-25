"use client";

import React from "react";
import { ArrowLeft, Mail, Briefcase, Sparkles, CheckCircle2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolio";

export function ResumeStatusCard() {
  const linkedinLink = SOCIAL_LINKS.find((s) => s.name === "LinkedIn");

  const handleGoBack = () => {
    // If opened in a new blank tab/window, close it
    if (window.opener || window.history.length <= 1) {
      window.close();
      // If browser security blocks window.close(), navigate to home
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
  };

  return (
    <main className="min-h-screen bg-background text-on-surface flex items-center justify-center p-4 sm:p-6 relative selection:bg-foreground/15">
      {/* Background technical grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 radial-mask pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full rounded-2xl border border-outline-variant/50 bg-surface-container/85 sm:backdrop-blur-md p-6 sm:p-10 shadow-2xl space-y-6 text-center">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-outline-variant/40 text-xs font-mono text-foreground font-semibold">
          <Briefcase className="w-3.5 h-3.5 text-foreground/70" />
          <span>FYI · Status Notice</span>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Currently Not Looking for Options
          </h1>
          <p className="text-xs sm:text-sm font-mono text-on-surface-variant">
            {PERSONAL_INFO.name} — {PERSONAL_INFO.headline}
          </p>
        </div>

        {/* Informational Message Box */}
        <div className="p-4 rounded-xl bg-surface/90 border border-outline-variant/30 text-left space-y-3 text-xs sm:text-sm text-on-surface leading-relaxed">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <p>
              I am currently happy in my current role and am <span className="font-semibold text-foreground">not looking for new opportunities, roles, or job options</span> at this time.
            </p>
          </div>
        </div>

        {/* Alternative Contact Links */}
        <div className="space-y-3 pt-1">
          <div className="text-xs font-mono text-on-surface-variant">
            Interested in connecting, chatting about VLSI/AI, or open-source?
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-mono font-semibold shadow-sm hover:opacity-90 transition-all active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send an Email</span>
            </a>

            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-outline-variant/50 text-foreground text-xs font-mono hover:bg-surface-container-high transition-all active:scale-95"
              >
                <FaLinkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Go Back / Close Tab Button */}
        <div className="pt-4 border-t border-outline-variant/30">
          <button
            onClick={handleGoBack}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-container-highest hover:bg-white dark:hover:bg-surface border border-outline-variant/60 text-foreground text-sm font-mono font-medium shadow-sm transition-all hover:border-foreground/50 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back / Close Page</span>
          </button>
        </div>
      </div>
    </main>
  );
}
