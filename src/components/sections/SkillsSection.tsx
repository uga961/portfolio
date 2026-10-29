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
    domain: "Transistor-Level Circuit Capture & Memory Architectures",
    narrative:
      "Deep focus on CMOS circuit design, comparative static noise margin (SNM) optimization, static leakage reduction in 6T and novel 7T SRAM architectures, and analog/transient verification in Cadence Virtuoso.",
    competencies: [
      "Cadence Virtuoso",
      "Assura DRC & LVS",
      "ADE Transient Simulation",
      "SRAM Design (6T & 7T)",
      "CMOS Digital Design",
      "Static Leakage Reduction",
      "RTL Design",
    ],
  },
  {
    index: "02",
    title: "Embedded Systems & Hardware",
    domain: "Real-Time Telemetry & Microcontroller Firmware",
    narrative:
      "Hardware-software interfacing, low-power telemetry links for autonomous UAVs, sensor integration over standard serial protocols, and hardware debugging routines.",
    competencies: [
      "Embedded C / C++",
      "UART, SPI, I2C Protocols",
      "Arduino & Microcontrollers",
      "Sensory Telemetry (IMU, Barometer, GPS)",
      "Hardware Fault Tolerance",
      "PWM & Analog Interfacing",
    ],
  },
  {
    index: "03",
    title: "Intelligent Systems & Data Science",
    domain: "Applied Predictive Pipelines & Multi-Agent Tooling",
    narrative:
      "Enterprise predictive modeling, statistical feature engineering, multi-agent LLM systems with Microsoft AutoGen, and high-throughput vision extraction pipelines leveraging Google Gemini via Vertex AI.",
    competencies: [
      "Python 3.11",
      "Google Gemini & Vertex AI",
      "Microsoft AutoGen",
      "scikit-learn & PyTorch",
      "Pandas & NumPy",
      "NLP (TF-IDF & Text Classifiers)",
      "Data Visualization (Matplotlib, Seaborn)",
    ],
  },
  {
    index: "04",
    title: "Systems Programming & Applications",
    domain: "Linux OS Primitives, .NET Core & Web Architectures",
    narrative:
      "Low-level memory management and POSIX concurrency in C, enterprise Clean Architecture microservices in .NET 8, native Windows WPF desktop utilities, and high-performance React/Next.js platforms.",
    competencies: [
      "C / C++ (Linux Internals & POSIX)",
      ".NET 8 & C#",
      "WPF Desktop Architecture",
      "Next.js 15 & React 19",
      "TypeScript",
      "SQL & Relational Schemas",
      "Git & Linux Toolchains",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-border/80 pb-4 text-xs font-mono text-on-surface-variant flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-foreground font-semibold uppercase tracking-wider">INDEX 004</span>
          <span className="text-border">/</span>
          <span>TECHNICAL DISCIPLINES &amp; COMPETENCIES</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px]">
          HARDWARE &middot; SYSTEMS &middot; INTELLIGENCE
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
              <h3 className="text-xl font-bold text-foreground font-sans tracking-tight">
                {d.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed font-sans">
              {d.narrative}
            </p>

            {/* Competency Listing */}
            <div className="pt-2 border-t border-border/40 space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant block font-medium">
                Core Technologies &amp; Methods:
              </span>
              <p className="text-xs font-mono text-foreground/90 leading-relaxed">
                {d.competencies.join(" &middot; ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
