"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Command, BookOpen } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { WritingSection } from "@/components/sections/WritingSection";
import { MediaSection } from "@/components/sections/MediaSection";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { MagneticDock } from "@/components/ui/MagneticDock";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { PERSONAL_INFO } from "@/data/portfolio";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-on-surface relative selection:bg-primary/20">
      {/* Top Floating Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 backdrop-blur-md bg-background/70 border-b border-outline-variant/20 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-container flex items-center justify-center p-1">
              <Image
                src={PERSONAL_INFO.logoPath}
                alt="Ugandhar Vaddi Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono text-on-surface-variant">
                {PERSONAL_INFO.domain}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Direct Blog Link Button */}
            <a
              href={`https://${PERSONAL_INFO.blogDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30 hover:border-emerald-500 text-xs font-mono transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blog</span>
              <span className="text-[10px] opacity-75">↗</span>
            </a>

            {/* Command Palette Trigger Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-foreground hover:border-primary/40 text-xs font-mono transition-all"
            >
              <Command className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-surface-container-highest text-[10px] text-on-surface-variant border border-outline-variant/30">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Sections */}
      <HeroSection />

      <div className="space-y-4">
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <WritingSection />
        <MediaSection />
      </div>

      <ContactFooter />

      {/* Floating Magnetic Dock Navigation (ayush101.dev style) */}
      <MagneticDock onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </main>
  );
}
