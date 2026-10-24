"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  FolderGit2,
  Briefcase,
  GraduationCap,
  BookOpen,
  Youtube,
  Mail,
  Copy,
  Check,
  Download,
  ExternalLink,
  Moon,
  Sun,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          setQuery("");
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#34d399", "#10b981", "#059669"],
    });
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const handleToggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    onClose();
  };

  const navItems = [
    { label: "Go to About", href: "#about", icon: <Briefcase className="w-4 h-4 text-primary" /> },
    { label: "Go to Experience", href: "#experience", icon: <Briefcase className="w-4 h-4 text-primary" /> },
    { label: "Go to Projects", href: "#projects", icon: <FolderGit2 className="w-4 h-4 text-primary" /> },
    { label: "Go to Education", href: "#education", icon: <GraduationCap className="w-4 h-4 text-primary" /> },
    { label: "Visit Engineering Blog", href: "https://blog.ugandhar.in", isExternal: true, icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
    { label: "Visit YouTube Channel", href: "https://www.youtube.com/@uga961", isExternal: true, icon: <Youtube className="w-4 h-4 text-red-400" /> },
    { label: "Go to Contact", href: "#contact", icon: <Mail className="w-4 h-4 text-primary" /> },
  ];

  const filteredItems = navItems.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 bg-black/60 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-lg rounded-2xl border border-outline-variant/40 bg-surface-container-high/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-outline-variant/30 pb-3">
          <Search className="w-4 h-4 text-on-surface-variant mr-3 ml-1" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-foreground placeholder:text-on-surface-variant/60 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-on-surface-variant hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="py-2 text-[11px] font-mono uppercase tracking-wider text-on-surface-variant px-2 mt-1">
          Quick Actions
        </div>
        <div className="space-y-1">
          <button
            onClick={handleCopyEmail}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container-highest hover:text-primary transition-colors text-left"
          >
            <span className="flex items-center gap-2.5">
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-primary" />}
              {copied ? "Email Copied!" : `Copy Email (${PERSONAL_INFO.email})`}
            </span>
            <span className="text-[10px] text-on-surface-variant font-mono">Action</span>
          </button>

          <a
            href={PERSONAL_INFO.resumePath}
            download="Ugandhar_Vaddi_Resume.pdf"
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container-highest hover:text-primary transition-colors text-left"
          >
            <span className="flex items-center gap-2.5">
              <Download className="w-4 h-4 text-primary" />
              Download Resume (PDF)
            </span>
            <span className="text-[10px] text-on-surface-variant font-mono">PDF</span>
          </a>

          <button
            onClick={handleToggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container-highest hover:text-primary transition-colors text-left"
          >
            <span className="flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-amber-400 dark:hidden" />
              <Moon className="w-4 h-4 text-sky-400 hidden dark:block" />
              Toggle Dark / Light Theme
            </span>
            <span className="text-[10px] text-on-surface-variant font-mono">Theme</span>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="py-2 text-[11px] font-mono uppercase tracking-wider text-on-surface-variant px-2 mt-2">
          Navigation
        </div>
        <div className="space-y-1 max-h-56 overflow-y-auto">
          {filteredItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              onClick={onClose}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container-highest hover:text-primary transition-colors text-left group"
            >
              <span className="flex items-center gap-2.5">
                {item.icon}
                {item.label}
              </span>
              {item.isExternal ? (
                <ExternalLink className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary" />
              ) : (
                <span className="text-[10px] text-on-surface-variant font-mono">Section</span>
              )}
            </a>
          ))}
        </div>

        <div className="border-t border-outline-variant/30 mt-3 pt-2 px-2 flex justify-between items-center text-[11px] text-on-surface-variant font-mono">
          <span>Press ESC to close</span>
          <span>Ugandhar Vaddi Portfolio</span>
        </div>
      </div>
    </div>
  );
}
