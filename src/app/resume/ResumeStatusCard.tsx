"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2, BookOpen, Briefcase, GraduationCap, Code2 } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolio";

export function ResumeStatusCard() {
  const linkedinLink = SOCIAL_LINKS.find((s) => s.name === "LinkedIn");
  const githubLink = SOCIAL_LINKS.find((s) => s.name === "GitHub");

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      if (window.opener || window.history.length <= 1) {
        window.close();
        setTimeout(() => {
          window.location.href = "/";
        }, 100);
        return;
      }

      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    }
  };

  const resumeJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://www.ugandhar.in/resume#webpage",
    url: "https://www.ugandhar.in/resume",
    name: "Career Status & Technical Background | Ugandhar Vaddi",
    mainEntity: {
      "@type": "Person",
      name: PERSONAL_INFO.name,
      jobTitle: "Associate Data Scientist",
      worksFor: {
        "@type": "Organization",
        name: "Tredence Analytics Solutions",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Sathyabama Institute of Science and Technology",
      },
    },
  };

  return (
    <main className="min-h-screen bg-background text-on-surface flex items-center justify-center p-4 sm:p-6 lg:p-8 relative selection:bg-foreground/15 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />

      <div className="relative z-10 max-w-xl w-full rounded-[4px] border border-border/90 bg-surface p-6 sm:p-8 space-y-6 shadow-subtle">
        {/* Editorial Index */}
        <div className="border-b border-border/80 pb-3 text-xs font-mono text-on-surface-variant flex items-center justify-between">
          <span className="text-foreground font-semibold uppercase tracking-wider">CAREER RECORD</span>
          <span>INDEX RECORD · 2026</span>
        </div>

        {/* Headline */}
        <div className="space-y-1.5 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans uppercase">
            {PERSONAL_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm font-mono text-on-surface-variant">
            {PERSONAL_INFO.headline} · Chennai, India
          </p>
        </div>

        {/* Current Status Box */}
        <div className="p-4 rounded-[3px] bg-surface-subtle border border-border/80 text-left space-y-2 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground">Current Status:</span> I am happily committed to my role at <span className="font-medium text-foreground">Tredence Analytics Solutions</span> and am <span className="font-semibold text-foreground">not actively seeking new employment opportunities</span>.
            </div>
          </div>
        </div>

        {/* Career & Experience Snapshot */}
        <div className="space-y-3 text-left pt-2">
          <div className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-on-surface-variant" />
            <span>Professional Experience Summary</span>
          </div>
          <div className="space-y-2 text-xs font-mono text-on-surface-variant">
            <div className="p-3 rounded-[3px] border border-border/70 bg-surface/50 space-y-1">
              <div className="flex items-center justify-between text-foreground font-semibold">
                <span>Associate Data Scientist</span>
                <span className="text-[11px] text-on-surface-variant">Nov 2026 – Present</span>
              </div>
              <div className="text-[11px] text-on-surface-variant">Tredence Analytics Solutions · Chennai, India</div>
              <p className="text-xs font-sans text-foreground/80 pt-0.5">Enterprise machine learning models, predictive pipelines, and automated intelligence systems.</p>
            </div>

            <div className="p-3 rounded-[3px] border border-border/70 bg-surface/50 space-y-1">
              <div className="flex items-center justify-between text-foreground font-semibold">
                <span>Research &amp; Insights Intern (Ops.Cleansheet)</span>
                <span className="text-[11px] text-on-surface-variant">Nov 2025 – Jun 2026</span>
              </div>
              <div className="text-[11px] text-on-surface-variant">McKinsey &amp; Company · Chennai, India</div>
              <p className="text-xs font-sans text-foreground/80 pt-0.5">Automated analytics pipelines and generative AI schematic extraction at DtV Lab.</p>
            </div>

            <div className="p-3 rounded-[3px] border border-border/70 bg-surface/50 space-y-1">
              <div className="flex items-center justify-between text-foreground font-semibold">
                <span>DotNet Full Stack Engineer Apprentice</span>
                <span className="text-[11px] text-on-surface-variant">Jun 2025 – Aug 2025</span>
              </div>
              <div className="text-[11px] text-on-surface-variant">Cognizant · Chennai, India</div>
              <p className="text-xs font-sans text-foreground/80 pt-0.5">Enterprise REST APIs and backend microservices using .NET Core and Entity Framework.</p>
            </div>
          </div>
        </div>

        {/* Education Snapshot */}
        <div className="space-y-3 text-left pt-2">
          <div className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-on-surface-variant" />
            <span>Academic Background</span>
          </div>
          <div className="p-3 rounded-[3px] border border-border/70 bg-surface/50 space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between text-foreground font-semibold">
              <span>Sathyabama Institute of Science and Technology</span>
              <span className="text-[11px] text-on-surface-variant">2022 – 2026</span>
            </div>
            <div className="text-[11px] text-on-surface-variant">B.E. in Electronics &amp; Communication Engineering · 9.0 CGPA</div>
            <div className="text-xs font-sans text-foreground/80 pt-1">
              Honors: <span className="text-amber-600 dark:text-amber-400 font-medium">Star of Excellence Award</span> (presented by Abhishek Sharma) · Chairperson for ISTE Student Chapter · President of Science Club.
            </div>
          </div>
        </div>

        {/* Technical Disciplines */}
        <div className="space-y-2 text-left pt-2">
          <div className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-on-surface-variant" />
            <span>Core Disciplines</span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-on-surface-variant">
            {["Machine Learning", "Predictive Analytics", "Python", "SQL", "VLSI CAD", "SRAM Architectures", "C/C++", ".NET Core"].map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-[2px] bg-surface-subtle border border-border/80">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Links */}
        <div className="space-y-3 pt-2 text-left">
          <div className="text-xs font-mono text-on-surface-variant">
            Direct correspondence &amp; professional profiles:
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[3px] bg-foreground text-background text-xs font-mono uppercase tracking-wider hover:bg-foreground/90 transition-colors touch-manipulation min-h-[38px]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[3px] border border-border/90 bg-surface/80 text-foreground text-xs font-mono hover:border-foreground transition-colors touch-manipulation min-h-[38px]"
              >
                <FaLinkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[3px] border border-border/90 bg-surface/80 text-foreground text-xs font-mono hover:border-foreground transition-colors touch-manipulation min-h-[38px]"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[3px] border border-border/90 bg-surface/80 text-foreground text-xs font-mono hover:border-foreground transition-colors touch-manipulation min-h-[38px]"
            >
              <BookOpen className="w-3.5 h-3.5 text-on-surface-variant" />
              <span>Technical Journal</span>
            </Link>
          </div>
        </div>

        {/* Go Back / Close Tab Button */}
        <div className="pt-4 border-t border-border/80">
          <button
            onClick={handleGoBack}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[3px] border border-border/90 bg-surface-subtle hover:bg-surface hover:border-foreground text-foreground text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer touch-manipulation min-h-[40px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </div>
    </main>
  );
}
