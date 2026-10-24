# Ugandhar Vaddi — Personal Engineering Portfolio

Official repository for [ugandhar.in](https://ugandhar.in).

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed for high performance, accessibility, and visual cohesion with [blog.ugandhar.in](https://blog.ugandhar.in).

---

## Architecture Overview

```
src/
├── app/
│   ├── [...not_found]/     # Catch-all route returning 307 redirect to "/"
│   ├── api/blog-feed/      # Next.js API route fetching RSS from blog.ugandhar.in
│   ├── globals.css         # Parchment & carbon design tokens, base styles
│   ├── layout.tsx          # Root layout, font definitions, ThemeProvider
│   └── page.tsx            # Main single-page portfolio layout
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx         # 2-col hero, portrait frame, pill row
│   │   ├── ProjectsSection.tsx     # Filterable project grid, contributor tags
│   │   ├── ExperienceSection.tsx   # Company selector, responsibilities, skills
│   │   ├── WritingSection.tsx      # Latest 2 blog posts + direct blog redirect
│   │   ├── MediaSection.tsx        # Featured playlist & latest YouTube video
│   │   └── ContactFooter.tsx       # Direct email, LinkedIn, resume, time zone
│   └── ui/
│       ├── MagneticDock.tsx        # Desktop floating dock & mobile bottom bar
│       ├── SpotlightCard.tsx       # Soft touch-up radial highlight container
│       ├── SocialIcons.tsx         # SVG icons (GitHub, LinkedIn, YouTube, etc.)
│       └── ThemeToggle.tsx         # Light / Dark mode toggle switch
├── data/
│   └── portfolio.ts        # Central single-source-of-truth configuration
└── lib/
    ├── utils.ts            # Class merging utility (clsx + tailwind-merge)
    └── blog.ts             # RSS XML parser with fallback static cache
```

- **Framework**: Next.js 15 (App Router) with Turbopack bundler.
- **Styling**: Tailwind CSS with custom HSL surface tokens and dark/light modes.
- **Typography**: Geist Sans (interface), Geist Mono (data & code), Newsreader (editorial accents).
- **Navigation**: Floating magnetic dock on desktop with spring physics, auto-adapting to a fixed bottom navigation bar on mobile.
- **Dynamic Content**: Live RSS synchronization from `https://blog.ugandhar.in/feed.xml` with automatic fallback to local static data.
- **Security & Privacy**: Wildcard routes permanently redirect to root (`/`), and proprietary internal enterprise work hides external source links.

---

## Content Management Guide

All portfolio data is centralized in a single configuration file:

```
src/data/portfolio.ts
```

### 1. How to Add a New Experience

Open `src/data/portfolio.ts` and add an object to the `EXPERIENCES` array:

```typescript
{
  company: "Tredence Analytics Solutions",
  role: "Associate Data Scientist",
  period: "Nov 2026 – Present (Joining Soon)",
  location: "Chennai, India",
  type: "Full-time", // "Full-time" | "Internship" | "Apprenticeship" | "Contract"
  team: "Analytics & Applied AI",
  isIncoming: true, // Displays high-contrast "Joining Soon" tag
  description: "Brief summary of core mandate.",
  bullets: [
    "Key achievement or technical contribution.",
    "Pipeline development, model optimization, or architecture improvement.",
    "Feature engineering and production deployment."
  ],
  skills: ["Python", "Machine Learning", "Data Science", "SQL"],
  repoUrl: "https://github.com/uga961/practice-repo" // Optional practice repo link
}
```

### 2. How to Add a New Project

Append an object to the `PROJECTS` array in `src/data/portfolio.ts`:

**Standard Public Project:**
```typescript
{
  id: "project-id",
  title: "StayActive",
  subtitle: "Cross-platform background wellness & activity tracker",
  description: "Detailed description of what the project does and how it was built.",
  category: "Desktop & Web", // "AI & ML" | "Hardware & VLSI" | "Desktop & Web"
  tags: ["C#", "WPF", "Windows API"],
  metrics: "500+ active users",
  githubUrl: "https://github.com/uga961/StayActive",
  liveUrl: "https://stayactive.ugandhar.in", // Optional live URL
  featured: true,
  date: "Sep 2026",
  contributors: [] // Leave empty or omit for "Solo Project"
}
```

**Collaborative Project (Shows Contributor Badges):**
```typescript
{
  id: "vlsi-sram",
  title: "Low-Power SRAM Architecture",
  subtitle: "6T and 7T Cell Implementations in Cadence",
  description: "Detailed breakdown of transistor-level memory cell design.",
  category: "Hardware & VLSI",
  tags: ["Cadence Virtuoso", "Spectre", "VLSI"],
  githubUrl: "https://github.com/uga961/sram-design",
  featured: false,
  date: "Jul 2025",
  contributors: ["Naralasetti Umesh"] // Displays "Contributors: Naralasetti Umesh"
}
```

**Proprietary Project (Hides External Links):**
```typescript
{
  id: "draw2spec",
  title: "Draw2Spec",
  subtitle: "AI-Powered Technical Drawing Digitizer",
  description: "Automated extraction and classification of engineering schematics.",
  category: "AI & ML",
  tags: ["Google Gemini Vision", "Vertex AI", "Python"],
  isProprietary: true, // Displays 'Proprietary' badge and hides GitHub/Live links
  featured: true,
  date: "Nov 2025 – Present"
}
```

### 3. How to Update YouTube Cards

In `src/data/portfolio.ts`, navigate to `YOUTUBE_CONTENT.items`. It is configured for exactly two primary cards (one Featured Playlist and one Latest Video):

```typescript
export const YOUTUBE_CONTENT: YouTubeContent = {
  channelName: "Ugandhar Vaddi",
  handle: "@uga961",
  url: "https://www.youtube.com/@uga961",
  description: "Workshops, programming series, and technical tutorials.",
  items: [
    {
      badge: "Featured",
      type: "Playlist",
      title: "Learn PYTHON in 5 Days or Less",
      description: "Comprehensive beginner to intermediate curriculum covering Python fundamentals, OOP, and data structures.",
      url: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID",
      topics: ["Python", "Google Colab", "OOP", "Data Structures"],
    },
    {
      badge: "Latest",
      type: "Video",
      title: "Data Visualization in Python | Matplotlib, Seaborn & Pandas Tutorial",
      description: "Hands-on workshop on building heatmaps, correlation plots, and custom visualizations.",
      url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
      topics: ["Matplotlib", "Seaborn", "Correlation Plots", "Pandas"],
    },
  ],
};
```

### 4. How to Update Your Resume or Profile Photo

- **Resume**: Replace the PDF at `public/resume/Resume.pdf`. The website opens it directly in a browser tab without forcing a file download.
- **Profile Photo**: Replace the image at `public/avatar/profile.jpg`.
- **Favicon / Logo**: Replace the asset at `public/Logo.png`.

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Open application
http://localhost:3000
```

---

## Production Build & Deployment

```bash
# Build optimized production bundle
npm run build

# Start production server locally
npm start
```

### Vercel Deployment

1. Import the `uga961/portfolio` repository into Vercel.
2. The framework preset is automatically detected as **Next.js**.
3. Under **Project Settings > Domains**, assign:
   - `ugandhar.in` (Primary)
   - `www.ugandhar.in` (Redirects to `ugandhar.in`)
4. Point DNS records at your domain registrar:
   - `A` record `@` &rarr; `76.76.21.21`
   - `CNAME` record `www` &rarr; `cname.vercel-dns.com`

---

## License

This project is open-source under the [MIT License](./LICENSE) © 2026 Ugandhar Vaddi.
