"use client";

import React from "react";

interface Discipline {
  index: string;
  title: string;
  domain: string;
  narrative: string;
  competencies: string[];
}

const DISCIPLINES: Discipline[] = [
  {
    index: "01",
    title: "Digital Design & VLSI",
    domain: "Circuits & Memory Architecture",
    narrative:
      "CMOS transistor-level capture, 6T/7T SRAM stability & SNM optimization, and transient simulation in Cadence Virtuoso.",
    competencies: [
      "Cadence Virtuoso",
      "Assura DRC & LVS",
      "ADE Simulation",
      "SRAM 6T/7T",
      "CMOS Logic",
      "RTL Design",
    ],
  },
  {
    index: "02",
    title: "Embedded Systems & Hardware",
    domain: "Telemetry & Microcontroller Firmware",
    narrative:
      "Sensor bus integration (I2C/SPI/UART), UAV telemetry links, and real-time hardware interfacing.",
    competencies: [
      "Embedded C / C++",
      "UART · SPI · I2C",
      "Arduino & MCUs",
      "UAV Telemetry",
      "Fault Tolerance",
      "Hardware Debugging",
    ],
  },
  {
    index: "03",
    title: "Applied AI & Data Science",
    domain: "Predictive Pipelines & Multi-Agent Systems",
    narrative:
      "Enterprise predictive modeling, multi-agent architectures (AutoGen), and vision extraction pipelines via Vertex AI.",
    competencies: [
      "Python 3.11",
      "Gemini & Vertex AI",
      "Microsoft AutoGen",
      "scikit-learn",
      "PyTorch",
      "Pandas & NumPy",
    ],
  },
  {
    index: "04",
    title: "Systems & Web Engineering",
    domain: "OS Primitives & Modern Runtimes",
    narrative:
      "POSIX memory concurrency in C, Clean Architecture in .NET 8, Android launchers & ADB, and Next.js web platforms.",
    competencies: [
      "C / C++ (Linux & POSIX)",
      ".NET 8 & C#",
      "Android SDK & ADB",
      "Next.js 15 & React 19",
      "TypeScript",
      "SQL Schemas",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Editorial Header */}
      <div className="border-b border-border/80 pb-4 text-xs font-mono text-on-surface-variant flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="text-foreground font-semibold uppercase tracking-wider flex-shrink-0">INDEX 004</span>
          <span className="text-border flex-shrink-0">/</span>
          <span className="truncate">TECHNICAL DISCIPLINES &amp; COMPETENCIES</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] flex-shrink-0">
          HARDWARE · SYSTEMS · INTELLIGENCE
        </span>
      </div>

      <div className="pt-8 sm:pt-10 pb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans uppercase">
          Technical Toolkit
        </h2>
        <p className="mt-2 text-sm sm:text-base text-on-surface-variant font-sans max-w-xl">
          Organized by engineering discipline and real-world implementation rather than arbitrary percentage bars or badge walls.
        </p>
      </div>

      {/* Structured Matrix of Disciplines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 border-t border-border/80 pt-8 sm:pt-10">
        {DISCIPLINES.map((d) => (
          <div
            key={d.title}
            className="space-y-4 border-b md:border-b-0 pb-8 md:pb-0 border-border/60"
          >
            <div className="space-y-1">
              <div className="text-xs font-mono text-on-surface-variant flex items-center gap-2">
                <span className="text-foreground font-semibold">{d.index}</span>
                <span className="text-border">/</span>
                <span className="uppercase">{d.domain}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground font-sans tracking-tight break-words">
                {d.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed font-sans">
              {d.narrative}
            </p>

            {/* Competency Listing (Real unicode middle dot with break-words) */}
            <div className="pt-2 border-t border-border/40 space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant block font-medium">
                Core Technologies &amp; Methods:
              </span>
              <p className="text-xs font-mono text-foreground/90 leading-relaxed break-words">
                {d.competencies.join(" · ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
