import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { WritingSection } from "@/components/sections/WritingSection";
import { MediaSection } from "@/components/sections/MediaSection";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { PortfolioNavShell } from "@/components/ui/PortfolioNavShell";
import { PERSONAL_INFO } from "@/data/portfolio";
import { getLiveBlogPosts } from "@/lib/blog";

export const revalidate = 3600; // Revalidate every hour for dynamic blog updates

export default async function Home() {
  const liveBlogPosts = await getLiveBlogPosts();

  return (
    <main className="min-h-screen bg-background text-on-surface relative selection:bg-primary/20 pb-20 sm:pb-24">
      {/* Top Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 backdrop-blur-md bg-background/85 border-b border-outline-variant/20 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="#hero" className="flex items-center gap-2.5 group">
            {/* Clean, perfectly aligned logo icon */}
            <div className="relative w-7 h-7 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/icon.png"
                alt="Ugandhar Vaddi"
                width={28}
                height={28}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono text-on-surface-variant mt-1 leading-none">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-emerald-600/30 text-emerald-800 dark:text-emerald-400 hover:bg-surface-container-high text-xs font-mono transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blog</span>
              <span className="text-[10px] opacity-75">↗</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <HeroSection />

      <div className="space-y-4">
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <WritingSection initialPosts={liveBlogPosts} />
        <MediaSection />
      </div>

      <ContactFooter />

      {/* Client navigation shell: Floating Magnetic Dock + Command Palette */}
      <PortfolioNavShell />
    </main>
  );
}
