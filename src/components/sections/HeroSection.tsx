"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  Copy,
  Check,
  ArrowDown,
  MapPin,
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
      colors: ["#dedbc8", "#e1e0cc", "#a2a095"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 radial-mask pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Bio, Name & Actions */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-mono text-foreground/80"
          >
            <MapPin className="w-3.5 h-3.5 text-foreground/70" />
            <span>{PERSONAL_INFO.location}</span>
          </motion.div>

          {/* Large Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground font-sans">
              Ugandhar<span className="text-foreground/40 font-serif ml-1">*</span>
            </h1>

            <p className="text-base sm:text-xl font-medium text-on-surface-variant font-mono">
              {PERSONAL_INFO.headline}
            </p>
          </motion.div>

          {/* Bio Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans"
          >
            {PERSONAL_INFO.bioShort}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-all shadow-sm active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/60 text-foreground font-medium text-sm hover:bg-surface-container-high transition-all active:scale-95"
            >
              <FileText className="w-4 h-4 text-foreground/80" />
              <span>View Resume</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/60 text-foreground font-mono text-sm hover:bg-surface-container-high transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-on-surface-variant" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5"
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container/60 text-on-surface-variant hover:text-foreground hover:border-outline hover:bg-surface-container-high transition-all text-xs font-mono shadow-sm active:scale-95"
              >
                <SocialIcon name={link.icon} className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>{link.name}</span>
                {link.name === "Blog" && (
                  <span className="text-[10px] bg-surface-container-highest text-foreground px-1 rounded font-bold">
                    Live
                  </span>
                )}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Square Framed Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-outline-variant/50 bg-surface-container p-2 shadow-2xl group">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-surface-container-highest">
              <Image
                src={PERSONAL_INFO.avatarPath}
                alt={PERSONAL_INFO.name}
                fill
                priority
                sizes="(max-width: 640px) 256px, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="mt-3 text-[11px] font-mono text-on-surface-variant/80 tracking-widest uppercase">
            Build · Ship · Sleep
          </div>
        </motion.div>
      </div>

      {/* Quick Numbers Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-12 w-full"
      >
        <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/30 text-left">
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">9.0</div>
          <div className="text-xs text-on-surface-variant mt-0.5">B.E. ECE CGPA</div>
        </div>
        <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/30 text-left">
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">5+</div>
          <div className="text-xs text-on-surface-variant mt-0.5">Industry Roles & Projects</div>
        </div>
        <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/30 text-left">
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">22+</div>
          <div className="text-xs text-on-surface-variant mt-0.5">Public Repositories</div>
        </div>
        <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/30 text-left">
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">100%</div>
          <div className="text-xs text-on-surface-variant mt-0.5">Independent Work</div>
        </div>
      </motion.div>
    </section>
  );
}
