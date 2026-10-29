"use client";

import React, { useState } from "react";
import { ArrowUpRight, Lock, Star, Users, User } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/data/portfolio";

type CategoryFilter = "All" | "Hardware & VLSI" | "AI & ML" | "Desktop & Web";

export function ProjectsSection() {
  const [filter, setFilter] = useState<CategoryFilter>("All");

  const categories: CategoryFilter[] = [
    "All",
    "Hardware & VLSI",
    "AI & ML",
    "Desktop & Web",
  ];

  const filteredProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-border/80 pb-4 text-xs font-mono text-on-surface-variant flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-foreground font-semibold uppercase tracking-wider">INDEX 002</span>
          <span className="text-border">/</span>
          <span>SELECTED WORK &amp; ENGINEERING SYSTEMS</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px]">
          {filteredProjects.length} OF {PROJECTS.length} SYSTEMS LISTED
        </span>
      </div>

      <div className="pt-8 sm:pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans uppercase">
            Featured Systems
          </h2>
          <p className="mt-2 text-sm sm:text-base text-on-surface-variant font-sans max-w-xl">
            Transistor-level circuit design, autonomous multi-agent pipelines, native desktop utilities, and systems tooling.
          </p>
        </div>

        {/* Minimalist Filter Bar without ugly scrollbars */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 text-xs font-mono no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-[3px] transition-colors whitespace-nowrap cursor-pointer ${
                filter === cat
                  ? "bg-foreground text-background font-medium"
                  : "text-on-surface-variant hover:text-foreground hover:bg-surface-subtle"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Project Entries */}
      <div className="divide-y divide-border/80 border-t border-border/80">
        {filteredProjects.map((project, idx) => (
          <article
            key={project.id}
            className="py-8 sm:py-10 transition-colors group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Number, Title, Context */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono text-on-surface-variant">
                  <span className="text-foreground/70 font-semibold">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-border">/</span>
                  <span className="uppercase">{project.category}</span>
                  <span className="text-border">/</span>
                  <span>{project.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-tight">
                  {project.title}
                </h3>

                <div className="text-sm font-medium text-foreground/80 font-serif italic">
                  {project.subtitle}
                </div>

                {/* Scope & Collaborators */}
                <div className="flex items-center gap-3 text-xs font-mono text-on-surface-variant pt-1">
                  {project.contributors && project.contributors.length > 0 ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 opacity-70" />
                      <span>With {project.contributors.join(", ")}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 opacity-70" />
                      <span>Solo Research &amp; Implementation</span>
                    </span>
                  )}

                  {project.stars !== undefined && project.stars > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{project.stars}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Detailed Technical Breakdown & Links */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
                  {project.description}
                </p>

                {project.longDescription && (
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-sans">
                    {project.longDescription}
                  </p>
                )}

                {/* Evidence / Metric Callout (No green tint!) */}
                {project.metrics && (
                  <div className="text-xs font-mono text-foreground border-l-2 border-foreground/50 pl-3 py-1 bg-surface-subtle/50">
                    <span className="text-foreground/70 font-semibold uppercase tracking-wider text-[10px] block mb-0.5">
                      Evidence &amp; Measurements
                    </span>
                    <span>{project.metrics}</span>
                  </div>
                )}

                {/* Technology Metadata Line (Real unicode middle dot) */}
                <div className="pt-2 text-xs font-mono text-on-surface-variant">
                  <span className="text-foreground/70 font-semibold mr-2 uppercase tracking-wider text-[11px]">
                    Stack:
                  </span>
                  <span>{project.tags.join(" · ")}</span>
                </div>

                {/* Links */}
                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-mono">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-foreground hover:underline font-medium"
                    >
                      <SiGithub className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-foreground hover:underline font-medium"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  )}

                  {project.blogSlug && (
                    <a
                      href={`https://blog.ugandhar.in/posts/${project.blogSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-foreground hover:underline font-medium"
                    >
                      <span>Engineering Essay</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  )}

                  {project.isProprietary && (
                    <span className="inline-flex items-center gap-1.5 text-on-surface-variant italic">
                      <Lock className="w-3 h-3 opacity-60" />
                      <span>Internal Enterprise Tool (Private IP)</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
