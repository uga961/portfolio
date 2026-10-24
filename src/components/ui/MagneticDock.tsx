"use client";

import React, { useRef, useState } from "react";
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
}

function DockIcon({
  mouseX,
  label,
  href,
  isExternal,
  onClick,
  icon,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [40, 56, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center rounded-full bg-surface-container/80 text-on-surface hover:text-primary hover:bg-surface-container-high transition-colors border border-outline-variant/30 backdrop-blur-sm cursor-pointer shadow-sm group"
    >
      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-container-highest px-2.5 py-1 text-xs font-mono font-medium text-foreground shadow-lg border border-outline-variant/40 pointer-events-none z-50"
        >
          {label}
          {isExternal && <span className="ml-1 text-primary text-[10px]">↗</span>}
        </motion.div>
      )}
      <div className="flex items-center justify-center w-5 h-5">{icon}</div>
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

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2",
        className
      )}
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-outline-variant/40 bg-surface-container-low/75 backdrop-blur-xl shadow-2xl"
      >
        <DockIcon
          mouseX={mouseX}
          label="Home"
          href="#hero"
          icon={<Home className="w-4 h-4" />}
        />
        <DockIcon
          mouseX={mouseX}
          label="About"
          href="#about"
          icon={<User className="w-4 h-4" />}
        />
        <DockIcon
          mouseX={mouseX}
          label="Experience"
          href="#experience"
          icon={<Briefcase className="w-4 h-4" />}
        />
        <DockIcon
          mouseX={mouseX}
          label="Projects"
          href="#projects"
          icon={<FolderGit2 className="w-4 h-4" />}
        />

        <div className="w-[1px] h-6 bg-outline-variant/40 mx-1" />

        <DockIcon
          mouseX={mouseX}
          label="Blog"
          href="https://blog.ugandhar.in"
          isExternal
          icon={<BookOpen className="w-4 h-4 text-emerald-400" />}
        />
        <DockIcon
          mouseX={mouseX}
          label="YouTube"
          href="#media"
          icon={<Youtube className="w-4 h-4 text-red-400" />}
        />
        <DockIcon
          mouseX={mouseX}
          label="Contact"
          href="#contact"
          icon={<Mail className="w-4 h-4" />}
        />

        <div className="w-[1px] h-6 bg-outline-variant/40 mx-1" />

        {onOpenCommandPalette && (
          <DockIcon
            mouseX={mouseX}
            label="Command (Ctrl+K)"
            onClick={onOpenCommandPalette}
            icon={<Command className="w-4 h-4" />}
          />
        )}

        <div className="flex items-center justify-center pl-1">
          <ThemeToggle />
        </div>
      </motion.div>
    </div>
  );
}
