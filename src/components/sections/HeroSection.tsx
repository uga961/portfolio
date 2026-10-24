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
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting matching blog.ugandhar.in emerald glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 radial-mask pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-7">
        {/* Availability status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-primary/30 shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono font-medium text-primary">
            {PERSONAL_INFO.status}
          </span>
        </motion.div>

        {/* Profile Avatar with dynamic ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-emerald-400/40 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-subtle" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-surface-container border border-outline-variant/50 overflow-hidden shadow-xl">
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
            <Sparkles className="w-3.5 h-3.5 text-primary animate-spin-slow" />
          </div>
        </motion.div>

        {/* Main Title & Headline */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-on-surface-variant text-sm font-mono"
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{PERSONAL_INFO.location}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl font-medium text-primary font-mono tracking-wide"
          >
            {PERSONAL_INFO.headline}
          </motion.p>
        </div>

        {/* Bio Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl text-sm sm:text-base text-on-surface-variant leading-relaxed font-sans"
        >
          {PERSONAL_INFO.bioShort}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-hover transition-all duration-200 shadow-glow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Projects
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>

          <a
            href={PERSONAL_INFO.resumePath}
            download="Ugandhar_Vaddi_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/50 text-foreground font-medium text-sm hover:bg-surface-container-high hover:border-primary/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4 text-primary" />
            Resume (PDF)
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface font-mono text-sm hover:bg-surface-container-high hover:border-primary/50 transition-all duration-200 active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-primary" />
                <span className="text-primary">Copied!</span>
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
          transition={{ duration: 0.6, delay: 0.45 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/30 bg-surface-container-low/70 text-on-surface-variant hover:text-foreground hover:border-primary/40 hover:bg-surface-container-high transition-all duration-200 text-xs font-mono shadow-sm hover:scale-105 ${
                link.name === "Blog"
                  ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-300 font-semibold"
                  : ""
              }`}
            >
              <SocialIcon name={link.icon} className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>{link.name}</span>
              {link.name === "Blog" && (
                <span className="text-[10px] bg-primary/20 text-primary px-1 rounded">Live</span>
              )}
            </a>
          ))}
        </motion.div>

        {/* Quick Highlights Badge Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 w-full max-w-3xl"
        >
          <div className="p-3 rounded-xl bg-surface-container/40 border border-outline-variant/20">
            <div className="text-xl sm:text-2xl font-bold font-mono text-primary">9.2</div>
            <div className="text-xs text-on-surface-variant mt-0.5">B.E. ECE CGPA</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container/40 border border-outline-variant/20">
            <div className="text-xl sm:text-2xl font-bold font-mono text-foreground">5+</div>
            <div className="text-xs text-on-surface-variant mt-0.5">Industry Roles & Projects</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container/40 border border-outline-variant/20">
            <div className="text-xl sm:text-2xl font-bold font-mono text-foreground">22+</div>
            <div className="text-xs text-on-surface-variant mt-0.5">Public Repos & Experiments</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container/40 border border-outline-variant/20">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">100%</div>
            <div className="text-xs text-on-surface-variant mt-0.5">Independent & Open</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
