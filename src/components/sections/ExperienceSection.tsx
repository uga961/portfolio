"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink, GitBranch, Terminal } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

export function ExperienceSection() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-xs font-mono text-primary">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work & Apprenticeships</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Engineering Experience
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          From industry internships at McKinsey and enterprise .NET development at Cognizant, to low-level Linux systems programming and UAV avionics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Company selector tabs */}
        <div className="md:col-span-4 flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {EXPERIENCES.map((exp, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={exp.company}
                onClick={() => setSelectedIdx(idx)}
                className={`flex-shrink-0 text-left p-3.5 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-surface-container-high border-primary/50 shadow-sm"
                    : "bg-surface-container/40 border-outline-variant/20 hover:bg-surface-container hover:border-outline-variant/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold truncate ${
                      isSelected ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {exp.company}
                  </span>
                  {exp.type === "Internship" ? (
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">
                      Intern
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-surface-container-highest text-emerald-400">
                      Apprentice
                    </span>
                  )}
                </div>
                <div className="text-xs text-on-surface-variant truncate mt-1">
                  {exp.role}
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant/70 mt-1">
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
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {EXPERIENCES[selectedIdx].role}
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                      {EXPERIENCES[selectedIdx].type}
                    </span>
                  </div>

                  <div className="text-base font-medium text-primary mt-1">
                    {EXPERIENCES[selectedIdx].company}
                    {EXPERIENCES[selectedIdx].team && (
                      <span className="text-on-surface-variant font-normal">
                        {" "}
                        · {EXPERIENCES[selectedIdx].team}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-on-surface-variant mt-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {EXPERIENCES[selectedIdx].period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {EXPERIENCES[selectedIdx].location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {EXPERIENCES[selectedIdx].description}
                </p>

                {/* Key Achievements Bullet points */}
                <div className="space-y-2.5">
                  <div className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                    Key Contributions & Focus Areas
                  </div>
                  <ul className="space-y-2 text-sm text-on-surface-variant">
                    {EXPERIENCES[selectedIdx].bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-primary mt-1 font-mono">▸</span>
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
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-high/60 hover:bg-surface-container-highest hover:border-primary/50 text-xs font-mono text-primary transition-all"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>View Program Practice Repo</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                )}

                {/* Skills tags */}
                <div className="pt-2 border-t border-outline-variant/20">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant mb-2">
                    Technologies & Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {EXPERIENCES[selectedIdx].skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface-container-highest/60 border border-outline-variant/30 text-on-surface"
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
