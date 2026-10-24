# Ugandhar Vaddi — Personal Engineering Portfolio 🌐

[![Website](https://img.shields.io/badge/Website-ugandhar.in-047857?style=flat-square&logo=googlechrome&logoColor=white)](https://ugandhar.in)
[![Blog](https://img.shields.io/badge/Blog-blog.ugandhar.in-10b981?style=flat-square&logo=hashnode&logoColor=white)](https://blog.ugandhar.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)

An ultra-responsive, dynamic portfolio for **Ugandhar Vaddi** built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Designed with a high-contrast Notion / Claude terminal aesthetic, in complete visual harmony with [blog.ugandhar.in](https://blog.ugandhar.in).

---

## ✨ Features

- 🎯 **Design Cohesion:** Styled with Material Design 3 emerald/forest palette, paired with `Geist Sans`, `Geist Mono`, and `Newsreader` serif typography.
- 🌓 **High-Contrast Dark & Light Mode:** Optimized contrast ratios in both light and dark modes with flash-free inline hydration.
- 🧲 **Magnetic Floating Dock:** Fluid macOS/Dock-style navigation with spring magnification on desktop and a compact, stable tap bar on mobile devices.
- ⚡ **Dynamic Blog Sync:** Automatically pulls live RSS posts from `https://blog.ugandhar.in/feed.xml` via Next.js ISR (revalidated hourly) with instant client-side refresh.
- 📺 **Interactive Media Showcase:** Direct video cards linking to hands-on Python/Pandas workshops and creative storytelling on [@uga961](https://www.youtube.com/@uga961).
- ⌨️ **Command Palette (`⌘K` / `Ctrl+K`):** Spotlight-style quick search to jump to sections, copy email with confetti, toggle themes, or download the resume.
- 🔒 **Enterprise & IP Protection:** Proprietary work (e.g. Draw2Spec, SpecMap) is showcased with technical architecture summaries while strictly preventing link leakage.

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS + PostCSS
- **Animations:** Framer Motion (`framer-motion`)
- **Icons:** `lucide-react` & `react-icons` (Simple Icons & FontAwesome 6)
- **Feedback & Micro-interactions:** `canvas-confetti`
- **Deployment:** Vercel

---

## 📁 How to Update Your Content

All portfolio data is decoupled and centralized in a single configuration file:

```text
src/data/portfolio.ts
```

- **Add an Experience:** Append an object to the `EXPERIENCES` array.
- **Add a Project:** Append an object to the `PROJECTS` array (set `isProprietary: true` if no external repo link should be exposed).
- **Update YouTube Videos:** Add video IDs and titles to `YOUTUBE_INFO.featuredVideos`.
- **Update Socials / Bio:** Edit `PERSONAL_INFO` and `SOCIAL_LINKS`.

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server with Turbopack
npm run dev

# 3. Open browser
http://localhost:3000
```

---

## 🚢 Production Build & Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

Deployable with zero configuration on **[Vercel](https://vercel.com)**. Connect custom domain `ugandhar.in` in Vercel settings.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE) © 2026 Ugandhar Vaddi.
