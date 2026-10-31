import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { MagneticDock } from "@/components/ui/MagneticDock";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PERSONAL_INFO } from "@/data/portfolio";
import { getLiveThoughtPosts } from "@/lib/thought";

// Code-split below-the-fold client components with SSR preserved for SEO & instant HTML render
const ExperienceSection = dynamic(() =>
  import("@/components/sections/ExperienceSection").then(
    (mod) => mod.ExperienceSection,
  ),
);
const ProjectsSection = dynamic(() =>
  import("@/components/sections/ProjectsSection").then(
    (mod) => mod.ProjectsSection,
  ),
);
const SkillsSection = dynamic(() =>
  import("@/components/sections/SkillsSection").then(
    (mod) => mod.SkillsSection,
  ),
);
const EducationSection = dynamic(() =>
  import("@/components/sections/EducationSection").then(
    (mod) => mod.EducationSection,
  ),
);
const WritingSection = dynamic(() =>
  import("@/components/sections/WritingSection").then(
    (mod) => mod.WritingSection,
  ),
);
const MediaSection = dynamic(() =>
  import("@/components/sections/MediaSection").then((mod) => mod.MediaSection),
);
const ContactFooter = dynamic(() =>
  import("@/components/sections/ContactFooter").then(
    (mod) => mod.ContactFooter,
  ),
);

export const revalidate = 60; // 60-second ISR for near real-time post synchronization

export default async function Home() {
  const liveThoughtPosts = await getLiveThoughtPosts();

  return (
    <main className="min-h-screen bg-background text-on-surface relative selection:bg-foreground/15 selection:text-foreground pb-24 sm:pb-28">
      {/* Top Architectural Header — GPU layer accelerated for buttery 60fps in Gecko/Firefox & Mobile */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 bg-background/95 sm:bg-background/90 sm:backdrop-blur-md border-b border-border/80 transition-colors gpu-layer">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="#hero"
            className="flex items-center gap-3 group touch-manipulation"
          >
            <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/icon-sm.png"
                alt="Ugandhar Vaddi"
                width={24}
                height={24}
                priority
                className="w-full h-full object-contain rounded-[2px]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider uppercase text-foreground group-hover:underline leading-none">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono text-on-surface-variant mt-0.5 leading-none">
                {PERSONAL_INFO.domain}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-5 text-xs font-mono text-on-surface-variant"
          >
            <a
              href="#projects"
              className="hover:text-foreground hover:underline transition-colors touch-manipulation"
            >
              Work
            </a>
            <a
              href="#experience"
              className="hover:text-foreground hover:underline transition-colors touch-manipulation"
            >
              Experience
            </a>
            <a
              href="#skills"
              className="hover:text-foreground hover:underline transition-colors touch-manipulation"
            >
              Disciplines
            </a>
            <a
              href="#education"
              className="hover:text-foreground hover:underline transition-colors touch-manipulation"
            >
              Education
            </a>
            <a
              href="#writing"
              className="hover:text-foreground hover:underline transition-colors touch-manipulation"
            >
              Journal
            </a>
            <a
              href="#media"
              className="hover:text-foreground hover:underline transition-colors touch-manipulation"
            >
              Tutorials
            </a>
            <div className="w-[1px] h-3.5 bg-border/80 flex-shrink-0" />
            <a
              href={`https://${PERSONAL_INFO.thoughtsDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold hover:underline transition-colors flex items-center gap-0.5 touch-manipulation"
            >
              <span>Thoughts</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <WritingSection initialPosts={liveThoughtPosts} />
      <MediaSection />
      <ContactFooter />

      {/* Quick Navigation Dock */}
      <MagneticDock />
    </main>
  );
}
