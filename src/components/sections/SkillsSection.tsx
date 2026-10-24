"use client";

import React from "react";
import { Cpu, Code, Brain, Wrench } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

export function SkillsSection() {
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "Hardware & VLSI":
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case "AI, ML & Data Science":
        return <Brain className="w-4 h-4 text-teal-400" />;
      case "Languages & Frameworks":
        return <Code className="w-4 h-4 text-emerald-300" />;
      default:
        return <Wrench className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-3 mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-xs font-mono text-primary">
          <Cpu className="w-3.5 h-3.5" />
          <span>Core Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Technical Toolkit
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          A blend of silicon design, algorithmic data analysis, multi-agent LLM systems, and robust desktop engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((cat) => (
          <SpotlightCard key={cat.name} className="p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-outline-variant/20">
              {getCategoryIcon(cat.name)}
              <h3 className="text-base font-bold text-foreground font-mono">
                {cat.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-surface-container-low border border-outline-variant/30 text-on-surface hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
