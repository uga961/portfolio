"use client";

import React, { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";

export function ExperienceSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleExperiences = isExpanded ? EXPERIENCES : EXPERIENCES.slice(0, 3);

  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Editorial Header */}
      <div className="border-b border-border/80 pb-4 text-xs font-mono text-on-surface-variant flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="text-foreground font-semibold uppercase tracking-wider flex-shrink-0">INDEX 003</span>
          <span className="text-border flex-shrink-0">/</span>
          <span className="truncate">CHRONOLOGICAL RECORD</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] flex-shrink-0">
          {visibleExperiences.length} OF {EXPERIENCES.length} RECORDS DISPLAYED
        </span>
      </div>

      <div className="pt-8 sm:pt-10 pb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans uppercase">
          Engineering Experience
        </h2>
        <p className="mt-2 text-sm sm:text-base text-on-surface-variant font-sans max-w-xl">
          Practical contributions across predictive data intelligence, generative AI vision extraction, enterprise .NET services, Linux kernel internals, and UAV telemetry.
        </p>
      </div>

      {/* Chronological Editorial List */}
      <div className="divide-y divide-border/80 border-t border-border/80">
        {visibleExperiences.map((exp) => (
          <div
            key={exp.company}
            className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start"
          >
            {/* Left Column: Period, Location, Status */}
            <div className="md:col-span-4 space-y-1.5 text-xs font-mono">
              <div className="text-foreground font-semibold text-sm">
                {exp.period}
              </div>
              <div className="text-on-surface-variant">
                {exp.location}
              </div>
              <div className="pt-1">
                {exp.isIncoming ? (
                  <span className="inline-block text-[10px] uppercase font-semibold text-foreground bg-surface-subtle border border-border/80 px-2 py-0.5 rounded-[2px] tracking-wider">
                    Joining Soon
                  </span>
                ) : (
                  <span className="inline-block text-[10px] uppercase text-on-surface-variant tracking-wider">
                    {exp.type}
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Organization, Role, Detailed Bullet Points */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground font-sans tracking-tight break-words">
                  {exp.role}
                </h3>
                <div className="text-sm font-semibold text-foreground/90 font-mono mt-0.5 break-words">
                  {exp.company}
                  {exp.team && (
                    <span className="text-on-surface-variant font-normal">
                      {" "}· {exp.team}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed font-sans">
                {exp.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2 text-xs sm:text-sm text-foreground/85 font-sans">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-on-surface-variant/60 font-mono text-xs mt-1 select-none flex-shrink-0">
                      &mdash;
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Stack Metadata (Real unicode middle dot with break-words) */}
              <div className="pt-2 text-xs font-mono text-on-surface-variant flex flex-wrap items-center justify-between gap-2 break-words">
                <div className="break-words">
                  <span className="text-foreground/70 font-semibold mr-2 uppercase tracking-wider text-[11px]">
                    Focus:
                  </span>
                  <span>{exp.skills.join(" · ")}</span>
                </div>

                {exp.repoUrl && (
                  <a
                    href={exp.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground hover:underline touch-manipulation min-h-[36px]"
                  >
                    <span>Practice Repo</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {EXPERIENCES.length > 3 && (
        <div className="pt-8 sm:pt-10 flex justify-center border-t border-border/80">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] border border-border/90 bg-surface/80 hover:bg-surface hover:border-foreground text-foreground text-xs font-mono uppercase tracking-wider transition-all cursor-pointer touch-manipulation min-h-[40px] shadow-subtle"
          >
            <span>
              {isExpanded
                ? "Show Recent 3 Roles"
                : `View Full Chronological Record (+${EXPERIENCES.length - 3} More)`}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
