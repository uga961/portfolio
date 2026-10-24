"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink, GitBranch } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

export function ExperienceSection() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-mono text-foreground font-semibold">
          <Briefcase className="w-3.5 h-3.5 text-foreground/70" />
          <span>Work & Experience</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Engineering Experience
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          From industry engineering at McKinsey and enterprise .NET development at Cognizant, to low-level Linux systems programming and UAV avionics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Company selector tabs */}
        <div className="md:col-span-4 flex flex-row md:flex-col gap-2.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none touch-pan-x overscroll-x-contain">
          {EXPERIENCES.map((exp, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={exp.company}
                onClick={() => setSelectedIdx(idx)}
                className={`flex-shrink-0 text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-white dark:bg-surface-container-high border-foreground/50 shadow-md ring-1 ring-foreground/20"
                    : "bg-surface/70 border-outline-variant/40 hover:bg-white dark:hover:bg-surface-container hover:border-foreground/30 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-sm font-bold truncate ${
                      isSelected
                        ? "text-foreground"
                        : "text-foreground/80"
                    }`}
                  >
                    {exp.company}
                  </span>

                  {exp.isIncoming ? (
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-foreground/10 text-foreground border border-outline-variant/60 flex-shrink-0">
                      Joining Soon
                    </span>
                  ) : exp.type === "Internship" ? (
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/40 text-foreground/80 flex-shrink-0">
                      Intern
                    </span>
                  ) : exp.type === "Full-time" ? (
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/40 text-foreground/80 flex-shrink-0">
                      Full-time
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/40 text-foreground/80 flex-shrink-0">
                      Apprentice
                    </span>
                  )}
                </div>

                <div className="text-xs font-medium text-foreground/80 truncate mt-1">
                  {exp.role}
                </div>
                <div className="text-[11px] font-mono font-medium text-on-surface-variant mt-1.5">
                  {exp.period}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected experience detail card */}
        <div className="md:col-span-8">
          {EXPERIENCES[selectedIdx] && (
            <motion.div
              key={EXPERIENCES[selectedIdx].company}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <SpotlightCard className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {EXPERIENCES[selectedIdx].role}
                    </h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-surface-container-highest border border-outline-variant/60 text-foreground">
                      {EXPERIENCES[selectedIdx].isIncoming ? "Joining Soon" : EXPERIENCES[selectedIdx].type}
                    </span>
                  </div>

                  <div className="text-base font-semibold text-foreground mt-1">
                    {EXPERIENCES[selectedIdx].company}
                    {EXPERIENCES[selectedIdx].team && (
                      <span className="text-on-surface-variant font-normal">
                        {" "}
                        · {EXPERIENCES[selectedIdx].team}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-medium text-on-surface-variant mt-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-foreground/70" />
                      {EXPERIENCES[selectedIdx].period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-foreground/70" />
                      {EXPERIENCES[selectedIdx].location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed font-sans">
                  {EXPERIENCES[selectedIdx].description}
                </p>

                {/* Key Achievements Bullet points */}
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground/80">
                    Key Contributions & Focus Areas
                  </div>
                  <ul className="space-y-2.5 text-sm text-foreground/90">
                    {EXPERIENCES[selectedIdx].bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-foreground/70 mt-0.5 font-mono font-bold">▸</span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Associated Practice Repo Link if available */}
                {EXPERIENCES[selectedIdx].repoUrl && (
                  <div className="pt-2">
                    <a
                      href={EXPERIENCES[selectedIdx].repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/50 bg-surface-container-high hover:border-foreground/50 text-xs font-mono font-medium text-foreground transition-all"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-foreground/70" />
                      <span>View Program Practice Repo</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                    </a>
                  </div>
                )}

                {/* Skills tags */}
                <div className="pt-3 border-t border-outline-variant/30">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground/80 mb-2.5">
                    Technologies & Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {EXPERIENCES[selectedIdx].skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-surface-container-highest/80 border border-outline-variant/40 text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
