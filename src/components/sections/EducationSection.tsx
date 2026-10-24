"use client";

import React from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { EDUCATION } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

export function EducationSection() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-mono text-foreground font-medium">
          <GraduationCap className="w-3.5 h-3.5 text-foreground/70" />
          <span>Academic Background</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Education & Foundations
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          Rigorous academic foundations across Electronics and Communications, Mathematics, Circuit Theory, and Computer Science.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDUCATION.map((edu, idx) => (
          <SpotlightCard key={edu.institution} className="p-6 flex flex-col justify-between space-y-4 border-outline-variant/40 hover:border-foreground/50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-foreground font-bold">
                  {idx === 0 ? "Undergraduate" : idx === 1 ? "Higher Secondary" : "Secondary School"}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface-container-highest text-foreground border border-outline-variant/40">
                  {edu.grade}
                </span>
              </div>

              <h3 className="text-base font-bold text-foreground leading-snug">
                {edu.institution}
              </h3>

              <div className="text-xs text-on-surface-variant font-medium">
                {edu.degree}
              </div>

              <div className="space-y-1 text-[11px] font-mono text-on-surface-variant/90 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-foreground/70" />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-foreground/70" />
                  <span className="truncate">{edu.location}</span>
                </div>
              </div>

              {edu.highlights && (
                <ul className="space-y-1.5 pt-2 text-xs text-foreground/80">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-foreground/60 mt-0.5">▸</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-3 border-t border-outline-variant/30 flex flex-wrap gap-1">
              {edu.skills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest/80 text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
