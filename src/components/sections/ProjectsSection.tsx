"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Lock,
  BookOpen,
  Sparkles,
  Star,
  User,
  Users,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/data/portfolio";
import { SpotlightCard } from "../ui/SpotlightCard";

type CategoryFilter = "All" | "AI & ML" | "Hardware & VLSI" | "Desktop & Web";

export function ProjectsSection() {
  const [filter, setFilter] = useState<CategoryFilter>("All");

  const categories: CategoryFilter[] = [
    "All",
    "AI & ML",
    "Hardware & VLSI",
    "Desktop & Web",
  ];

  const filteredProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="space-y-3 mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-mono text-foreground font-medium">
          <FolderGit2 className="w-3.5 h-3.5 text-foreground/70" />
          <span>Selected Work & Engineering Systems</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1">
              Building across silicon, desktop utilities, machine learning systems, and web platforms.
            </p>
          </div>

          {/* Filter Pills - clean single-row on desktop */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface-container/60 border border-outline-variant/30 self-start sm:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 ${
                  filter === cat
                    ? "bg-foreground text-background font-semibold shadow-sm"
                    : "text-on-surface-variant hover:text-foreground hover:bg-surface-container-high"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className={project.id === "stayactive" ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <SpotlightCard className="h-full flex flex-col justify-between p-6 sm:p-7 space-y-5 border-outline-variant/40 hover:border-foreground/50 group">
                <div className="space-y-4">
                  {/* Card Header & Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-medium text-foreground/80">
                          {project.category}
                        </span>
                        <span className="text-[11px] font-mono text-on-surface-variant">
                          • {project.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:underline transition-colors flex items-center gap-2">
                        {project.title}
                        {project.id === "stayactive" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-container-highest border border-outline-variant/60 text-foreground font-semibold">
                            <Sparkles className="w-2.5 h-2.5 text-foreground/80" /> Featured Spotlight
                          </span>
                        )}
                      </h3>
                      <div className="text-xs text-on-surface-variant font-medium">
                        {project.subtitle}
                      </div>
                    </div>

                    {/* Status Badge */}
                    {project.isProprietary ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface-container-highest border border-outline-variant/50 text-foreground/80 whitespace-nowrap">
                        <Lock className="w-3 h-3 text-foreground/60" />
                        Proprietary
                      </span>
                    ) : (
                      project.stars !== undefined && project.stars > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface-container-highest text-foreground border border-outline-variant/40">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          {project.stars}
                        </span>
                      )
                    )}
                  </div>

                  {/* Project Description */}
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Contributors / Solo status badge */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant">
                    {project.contributors && project.contributors.length > 0 ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-foreground">
                        <Users className="w-3 h-3 text-foreground/70" />
                        <span>Contributors: {project.contributors.join(", ")}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-on-surface-variant">
                        <User className="w-3 h-3 opacity-60" />
                        <span>Solo Project</span>
                      </div>
                    )}
                  </div>

                  {/* Key Metrics / Highlights */}
                  {project.metrics && (
                    <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/40 text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span>{project.metrics}</span>
                    </div>
                  )}

                  {/* Deep dive for StayActive Spotlight */}
                  {project.id === "stayactive" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-mono text-on-surface-variant">
                      <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant/30">
                        <div className="font-semibold text-foreground">Hydration & Eye-Rest</div>
                        <div className="text-[11px] text-on-surface-variant mt-0.5">20-20-20 rule & water schedules</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant/30">
                        <div className="font-semibold text-foreground">Meeting Detection</div>
                        <div className="text-[11px] text-on-surface-variant mt-0.5">Pauses during active mics & calls</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant/30">
                        <div className="font-semibold text-foreground">System Media Pause</div>
                        <div className="text-[11px] text-on-surface-variant mt-0.5">Auto-pauses audio during reminders</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with Tags & Action Links */}
                <div className="pt-4 border-t border-outline-variant/30 space-y-4">
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container-highest/80 border border-outline-variant/40 text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* External Links */}
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground hover:underline font-medium"
                      >
                        <SiGithub className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                        <ExternalLink className="w-3 h-3 text-on-surface-variant" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground hover:underline font-medium"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {project.blogSlug && (
                      <a
                        href={`https://blog.ugandhar.in/posts/${project.blogSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground hover:underline ml-auto font-medium"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Essay</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {project.isProprietary && (
                      <span className="text-[11px] font-mono text-on-surface-variant italic">
                        Enterprise internal tool
                      </span>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
