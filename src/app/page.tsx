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
import { MagneticDock } from "@/components/ui/MagneticDock";
import { PERSONAL_INFO } from "@/data/portfolio";
import { getLiveBlogPosts } from "@/lib/blog";

export const revalidate = 3600; // Hourly ISR for automatic blog synchronization

export default async function Home() {
  const liveBlogPosts = await getLiveBlogPosts();

  return (
    <main className="min-h-screen bg-background text-on-surface relative selection:bg-foreground/15 pb-28 sm:pb-24">
      {/* Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 bg-background/95 sm:bg-background/85 sm:backdrop-blur-md border-b border-outline-variant/25 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="#hero" className="flex items-center gap-2.5 group">
            {/* Clean logo icon */}
            <div className="relative w-7 h-7 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/icon-sm.png"
                alt="Ugandhar Vaddi"
                width={28}
                height={28}
                priority
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-foreground group-hover:underline transition-colors leading-none">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/50 text-foreground hover:bg-surface-container-high text-xs font-mono transition-all font-medium"
            >
              <BookOpen className="w-3.5 h-3.5 text-foreground/80" />
              <span>Blog</span>
              <span className="text-[10px] opacity-70">↗</span>
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

      {/* Floating Magnetic Dock Navigation */}
      <MagneticDock />
    </main>
  );
}
