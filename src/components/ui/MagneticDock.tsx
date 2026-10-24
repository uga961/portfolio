"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  BookOpen,
  Youtube,
  Mail,
  Command,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface DockItemProps {
  mouseX: MotionValue<number>;
  label: string;
  href?: string;
  isExternal?: boolean;
  onClick?: () => void;
  icon: React.ReactNode;
  isMobile: boolean;
}

function DockIcon({
  mouseX,
  label,
  href,
  isExternal,
  onClick,
  icon,
  isMobile,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    if (isMobile) return 0;
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [38, 52, 38]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 14 });

  const content = (
    <motion.div
      ref={ref}
      style={{
        width: isMobile ? 36 : width,
        height: isMobile ? 36 : width,
      }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      className="relative flex items-center justify-center rounded-full bg-surface-container/90 text-on-surface hover:text-primary hover:bg-surface-container-high transition-colors border border-outline-variant/40 backdrop-blur-md cursor-pointer shadow-sm active:scale-95"
    >
      {/* Tooltip on desktop only */}
      {!isMobile && hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-container-highest px-2 py-0.5 text-[11px] font-mono font-medium text-foreground shadow-lg border border-outline-variant/40 pointer-events-none z-50"
        >
          {label}
          {isExternal && <span className="ml-1 text-primary text-[10px]">↗</span>}
        </motion.div>
      )}
      <div className="flex items-center justify-center w-4 h-4">{icon}</div>
    </motion.div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="focus:outline-none">
        {content}
      </button>
    );
  }

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus:outline-none"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}

interface MagneticDockProps {
  onOpenCommandPalette?: () => void;
  className?: string;
}

export function MagneticDock({ onOpenCommandPalette, className }: MagneticDockProps) {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center max-w-[calc(100vw-1rem)] px-1",
        className
      )}
    >
      <motion.div
        onMouseMove={(e) => !isMobile && mouseX.set(e.pageX)}
        onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border border-outline-variant/40 bg-surface-container-low/90 backdrop-blur-xl shadow-2xl overflow-x-auto scrollbar-none"
      >
        <DockIcon
          mouseX={mouseX}
          label="Home"
          href="#hero"
          icon={<Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          isMobile={isMobile}
        />
        <DockIcon
          mouseX={mouseX}
          label="Experience"
          href="#experience"
          icon={<Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          isMobile={isMobile}
        />
        <DockIcon
          mouseX={mouseX}
          label="Projects"
          href="#projects"
          icon={<FolderGit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          isMobile={isMobile}
        />

        <div className="w-[1px] h-5 bg-outline-variant/40 mx-0.5 sm:mx-1 flex-shrink-0" />

        <DockIcon
          mouseX={mouseX}
          label="Blog"
          href="https://blog.ugandhar.in"
          isExternal
          icon={<BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />}
          isMobile={isMobile}
        />
        <DockIcon
          mouseX={mouseX}
          label="YouTube"
          href="#media"
          icon={<Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />}
          isMobile={isMobile}
        />
        <DockIcon
          mouseX={mouseX}
          label="Contact"
          href="#contact"
          icon={<Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          isMobile={isMobile}
        />

        <div className="w-[1px] h-5 bg-outline-variant/40 mx-0.5 sm:mx-1 flex-shrink-0" />

        {onOpenCommandPalette && (
          <DockIcon
            mouseX={mouseX}
            label="Command (⌘K)"
            onClick={onOpenCommandPalette}
            icon={<Command className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            isMobile={isMobile}
          />
        )}

        <div className="flex items-center justify-center pl-0.5 sm:pl-1 flex-shrink-0">
          <ThemeToggle />
        </div>
      </motion.div>
    </div>
  );
}
