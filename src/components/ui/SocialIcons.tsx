"use client";

import React from "react";
import {
  SiGithub,
  SiYoutube,
  SiReddit,
  SiInstagram,
  SiHackerrank,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { BookOpen, ExternalLink, Globe, Code2 } from "lucide-react";

interface SocialIconProps {
  name: string;
  className?: string;
}

export function SocialIcon({ name, className = "w-5 h-5" }: SocialIconProps) {
  const norm = name.toLowerCase();

  switch (norm) {
    case "github":
      return <SiGithub className={className} />;
    case "linkedin":
      return <FaLinkedin className={className} />;
    case "youtube":
      return <SiYoutube className={className} />;
    case "reddit":
      return <SiReddit className={className} />;
    case "instagram":
      return <SiInstagram className={className} />;
    case "hackerrank":
      return <SiHackerrank className={className} />;
    case "blog":
      return <BookOpen className={className} />;
    case "website":
    case "globe":
      return <Globe className={className} />;
    case "code":
      return <Code2 className={className} />;
    default:
      return <ExternalLink className={className} />;
  }
}
