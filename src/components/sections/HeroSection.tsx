"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  Copy,
  Check,
  ArrowDown,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolio";
import { SocialIcon } from "../ui/SocialIcons";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#34d399", "#10b981", "#059669"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 radial-mask pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Availability status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-primary/30 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-400"></span>
          </span>
          <span className="text-xs font-mono font-medium text-emerald-800 dark:text-primary">
            {PERSONAL_INFO.status}
          </span>
        </motion.div>

        {/* Profile Avatar with clean aligned border */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 140 }}
          className="relative group"
        >
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-surface-container border border-outline-variant/60 shadow-lg">
            <Image
              src={PERSONAL_INFO.avatarPath}
              alt={PERSONAL_INFO.name}
              width={128}
              height={128}
              priority
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="absolute bottom-1 right-1 bg-surface-container-highest border border-primary/40 rounded-full p-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
        </motion.div>

        {/* Main Title & Headline */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center justify-center gap-2 text-on-surface-variant text-xs sm:text-sm font-mono"
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{PERSONAL_INFO.location}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base sm:text-xl font-medium text-emerald-800 dark:text-primary font-mono tracking-wide"
          >
            {PERSONAL_INFO.headline}
          </motion.p>
        </div>

        {/* Bio Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl text-sm sm:text-base text-on-surface-variant leading-relaxed font-sans"
        >
          {PERSONAL_INFO.bioShort}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-1"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-hover transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.resumePath}
            download="Ugandhar_Vaddi_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/60 text-foreground font-medium text-sm hover:bg-surface-container-high hover:border-primary/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Resume (PDF)</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/60 text-on-surface font-mono text-sm hover:bg-surface-container-high hover:border-primary/50 transition-all duration-200 active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-primary" />
                <span className="text-primary font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-on-surface-variant" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Social Links Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container/60 text-on-surface-variant hover:text-foreground hover:border-primary/50 hover:bg-surface-container-high transition-all text-xs font-mono shadow-sm active:scale-95 ${
                link.name === "Blog"
                  ? "border-emerald-600/40 bg-emerald-100/60 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-semibold"
                  : ""
              }`}
            >
              <SocialIcon name={link.icon} className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>{link.name}</span>
              {link.name === "Blog" && (
                <span className="text-[10px] bg-emerald-200 dark:bg-primary/20 text-emerald-900 dark:text-primary px-1 rounded">
                  Live
                </span>
              )}
            </a>
          ))}
        </motion.div>

        {/* Quick Highlights Notion-like grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 w-full max-w-3xl"
        >
          <div className="p-3 rounded-xl bg-surface-container/50 border border-outline-variant/30 text-left">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-800 dark:text-primary">9.2</div>
            <div className="text-xs text-on-surface-variant mt-0.5">B.E. ECE CGPA</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container/50 border border-outline-variant/30 text-left">
            <div className="text-xl sm:text-2xl font-bold font-mono text-foreground">5+</div>
            <div className="text-xs text-on-surface-variant mt-0.5">Industry Roles & Projects</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container/50 border border-outline-variant/30 text-left">
            <div className="text-xl sm:text-2xl font-bold font-mono text-foreground">22+</div>
            <div className="text-xs text-on-surface-variant mt-0.5">Public Repos & Work</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container/50 border border-outline-variant/30 text-left">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">100%</div>
            <div className="text-xs text-on-surface-variant mt-0.5">Independent & Open</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
