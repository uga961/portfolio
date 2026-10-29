"use client";

import React from "react";
import { EDUCATION } from "@/data/portfolio";

export function EducationSection() {
  return (
    <section id="education" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Editorial Header */}
      <div className="border-b border-border/80 pb-4 text-xs font-mono text-on-surface-variant flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="text-foreground font-semibold uppercase tracking-wider flex-shrink-0">INDEX 005</span>
          <span className="text-border flex-shrink-0">/</span>
          <span className="truncate">ACADEMIC FOUNDATIONS</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] flex-shrink-0">
          CIRCUIT THEORY · MATHEMATICS · COMPUTATION
        </span>
      </div>

      <div className="pt-8 sm:pt-10 pb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans uppercase">
          Academic Background
        </h2>
        <p className="mt-2 text-sm sm:text-base text-on-surface-variant font-sans max-w-xl">
          Formal training in semiconductor physics, VLSI circuit architecture, digital signal processing, and mathematics.
        </p>
      </div>

      {/* Chronological List */}
      <div className="divide-y divide-border/80 border-t border-border/80">
        {EDUCATION.map((edu, idx) => (
          <div
            key={edu.institution}
            className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start"
          >
            {/* Left Column: Period & Grade */}
            <div className="md:col-span-4 space-y-1.5 text-xs font-mono">
              <div className="text-foreground font-semibold text-sm">
                {edu.period}
              </div>
              <div className="text-on-surface-variant">
                {edu.location}
              </div>
              <div className="pt-1">
                <span className="inline-block text-xs font-mono font-semibold text-foreground bg-surface-subtle px-2 py-0.5 rounded-[2px] border border-border/80">
                  {edu.grade}
                </span>
              </div>
            </div>

            {/* Right Column: Institution, Degree, Highlights, Coursework */}
            <div className="md:col-span-8 space-y-3">
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                  {idx === 0 ? "Undergraduate Degree" : idx === 1 ? "Higher Secondary (12th)" : "Secondary School (10th)"}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-foreground font-sans tracking-tight mt-0.5 break-words">
                  {edu.institution}
                </h3>
                <div className="text-sm font-medium text-foreground/85 font-mono mt-0.5 break-words">
                  {edu.degree}
                </div>
              </div>

              {edu.highlights && (
                <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/80 font-sans pt-1">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-on-surface-variant/60 font-mono text-xs mt-1 select-none flex-shrink-0">
                        &mdash;
                      </span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Coursework / Skills (Real unicode middle dot with break-words) */}
              <div className="pt-2 text-xs font-mono text-on-surface-variant break-words">
                <span className="text-foreground/70 font-semibold mr-2 uppercase tracking-wider text-[11px]">
                  Focus Areas:
                </span>
                <span>{edu.skills.join(" · ")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
