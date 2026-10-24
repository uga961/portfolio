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
  Briefcase,
  FolderGit2,
  BookOpen,
  Youtube,
  Mail,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface DockItemProps {
  label: string;
  href: string;
  isExternal?: boolean;
  icon: React.ReactNode;
}

interface DesktopDockItemProps extends DockItemProps {
  mouseX: MotionValue<number>;
}

function MobileDockIcon({ label, href, isExternal, icon }: DockItemProps) {
  const content = (
    <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-surface-container/90 text-foreground active:bg-surface-container-high transition-colors border border-outline-variant/40 shadow-sm active:scale-90 touch-manipulation">
      <div className="flex items-center justify-center w-4 h-4 pointer-events-none">
        {icon}
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="focus:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label} className="focus:outline-none">
      {content}
    </Link>
  );
}

function DesktopDockIcon({
  mouseX,
  label,
  href,
  isExternal,
  icon,
}: DesktopDockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [38, 48, 38]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 20 });

  const content = (
    <motion.div
      ref={ref}
      style={{
        width,
        height: width,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center rounded-full bg-surface-container/90 text-foreground hover:bg-surface-container-high transition-colors border border-outline-variant/40 backdrop-blur-md cursor-pointer shadow-sm active:scale-95"
    >
      {hovered && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-container-highest px-2 py-0.5 text-[11px] font-mono font-medium text-foreground shadow-lg border border-outline-variant/40 pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-100">
          {label}
          {isExternal && <span className="ml-1 text-foreground/60 text-[10px]">↗</span>}
        </div>
      )}
      <div className="flex items-center justify-center w-4 h-4 pointer-events-none">
        {icon}
      </div>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="focus:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label} className="focus:outline-none">
      {content}
    </Link>
  );
}

export function MagneticDock({ className }: { className?: string }) {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Treat screens under 640px OR devices without fine hover pointers as mobile
      setIsMobile(
        window.innerWidth < 640 ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const items = [
    { label: "Home", href: "#hero", icon: <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { label: "Experience", href: "#experience", icon: <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { label: "Projects", href: "#projects", icon: <FolderGit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
  ];

  const secondaryItems = [
    { label: "Blog", href: "https://blog.ugandhar.in", isExternal: true, icon: <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { label: "YouTube", href: "#media", icon: <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
  ];

  return (
    <div
      onMouseMove={(e) => !isMobile && mouseX.set(e.clientX)}
      onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-auto touch-manipulation",
        className
      )}
    >
      <nav
        aria-label="Dock Navigation"
        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border border-outline-variant/40 bg-surface-container-low/95 sm:backdrop-blur-xl shadow-2xl overflow-visible"
      >
        {items.map((item) =>
          isMobile ? (
            <MobileDockIcon key={item.label} {...item} />
          ) : (
            <DesktopDockIcon key={item.label} mouseX={mouseX} {...item} />
          )
        )}

        <div className="w-[1px] h-5 bg-outline-variant/40 mx-0.5 sm:mx-1 flex-shrink-0" />

        {secondaryItems.map((item) =>
          isMobile ? (
            <MobileDockIcon key={item.label} {...item} />
          ) : (
            <DesktopDockIcon key={item.label} mouseX={mouseX} {...item} />
          )
        )}

        <div className="w-[1px] h-5 bg-outline-variant/40 mx-0.5 sm:mx-1 flex-shrink-0" />

        <div className="flex items-center justify-center pl-0.5 sm:pl-1 flex-shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
