"use client";

import React from "react";
import { GraduationCap, Award, BookCheck, MapPin, Calendar } from "lucide-react";
import { EDUCATION } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

export function EducationSection() {
  const certifications = [
    { title: "Responsive Web Design", issuer: "freeCodeCamp", tag: "Frontend" },
    { title: "Google Cloud Study Jams", issuer: "Generative AI & Cloud", tag: "Cloud / GenAI" },
    { title: "Data Structures through C & C++", issuer: "SIST", tag: "Algorithms" },
  ];

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-xs font-mono text-primary">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic Background</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Education & Credentials
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          Strong academic foundations across Electronics and Communications, Mathematics, and Computer Science.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDUCATION.map((edu, idx) => (
          <SpotlightCard key={edu.institution} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary font-bold">
                  {idx === 0 ? "Undergraduate" : idx === 1 ? "Higher Secondary" : "Secondary School"}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  {edu.grade}
                </span>
              </div>

              <h3 className="text-base font-bold text-foreground leading-snug">
                {edu.institution}
              </h3>

              <div className="text-xs text-on-surface-variant font-medium">
                {edu.degree}
              </div>

              <div className="space-y-1 text-[11px] font-mono text-on-surface-variant/80 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-primary" />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-primary" />
                  <span className="truncate">{edu.location}</span>
                </div>
              </div>

              {edu.highlights && (
                <ul className="space-y-1.5 pt-2 text-xs text-on-surface-variant">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">▸</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex flex-wrap gap-1">
              {edu.skills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest/60 text-on-surface-variant"
                >
                  {s}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Certifications Banner */}
      <div className="mt-10 p-6 rounded-2xl bg-surface-container/40 border border-outline-variant/30">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-foreground">
            Certifications & Technical Badges
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="p-3.5 rounded-xl bg-surface-container-low/80 border border-outline-variant/20 flex items-start gap-3"
            >
              <BookCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-foreground">{cert.title}</div>
                <div className="text-[11px] text-on-surface-variant mt-0.5">{cert.issuer}</div>
                <span className="inline-block mt-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container-highest text-primary">
                  {cert.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
