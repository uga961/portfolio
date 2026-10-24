# Ugandhar Vaddi — Personal Engineering Portfolio

Official repository for [ugandhar.in](https://ugandhar.in).

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed for high performance, accessibility, and visual cohesion with [blog.ugandhar.in](https://blog.ugandhar.in).

---

## Design System & Color Palette

This project uses an editorial **Warm Bone Parchment & Deep Carbon** palette inspired by physical paper typography, minimalist terminal editors, and modern design principles. It explicitly avoids synthetic high-saturation neon gradients in favor of warm, tactile surfaces.

### 1. Palette Specification

#### Light Theme (Parchment & Warm Bone)

| Role | CSS Variable | HSL Token | Hex Equivalent | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas Background** | `--background` | `48 20% 93%` | `#f2efe4` | Warm parchment paper canvas |
| **Card / Container Surface** | `--surface-container` | `48 18% 87%` | `#e4e1d2` | Primary card backdrop |
| **Card Highlight Surface** | `--surface-container-high` | `47 18% 83%` | `#dedbc8` | Elevated element container |
| **Muted Pill Surface** | `--surface-container-highest` | `47 15% 78%` | `#d3cfbe` | Badges, tags, and secondary pills |
| **Pure White Accent** | `--surface-container-lowest` | `0 0% 100%` | `#ffffff` | Tactile button hover background |
| **Primary Text (Carbon)** | `--foreground` | `60 8% 10%` | `#1a1a17` | High-contrast editorial carbon |
| **Secondary / Muted Text** | `--on-surface-variant` | `50 6% 36%` | `#5e5c54` | Metadata, dates, and captions |
| **Border / Divider** | `--outline-variant` | `48 12% 78%` | `#cfcbc0` | Subtle paper partition lines |

#### Dark Theme (Obsidian & Warm Bone)

| Role | CSS Variable | HSL Token | Hex Equivalent | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas Background** | `--background` | `60 5% 6%` | `#10100f` | Obsidian carbon canvas |
| **Card / Container Surface** | `--surface-container` | `60 4% 14%` | `#242422` | Deep charcoal card backdrop |
| **Card Highlight Surface** | `--surface-container-high` | `60 4% 18%` | `#2f2f2b` | Elevated element container |
| **Muted Pill Surface** | `--surface-container-highest` | `60 4% 22%` | `#3a3935` | Badges, tags, and secondary pills |
| **Primary Text (Warm Bone)**| `--foreground` | `48 22% 85%` | `#dedbc8` | Soft bone typography |
| **Secondary / Muted Text** | `--on-surface-variant` | `48 8% 62%` | `#a2a095` | Secondary metadata and captions |
| **Border / Divider** | `--outline-variant` | `60 4% 22%` | `#3a3935` | Subtle dark borders |

#### Functional Accent Colors

- **Live Status / Active Dot**: `#10b981` (`emerald-500`) — Strictly used for functional state indicators (e.g., Live Demo, Copied).
- **LinkedIn Blue**: `#0a66c2` — Social icon and hover accent.
- **YouTube Red**: `#ef4444` — Video media category accent.
- **GitHub**: Carbon (`#1a1a17`) in light mode / Bone (`#dedbc8`) in dark mode.

### 2. Micro-Interactions & Hover Dynamics

- **Spotlight Touch-Up**: Rather than a harsh floodlight, cards use a localized, feather-soft specular sheen:
  - Radius: `180px circle`
  - Light mode sheen: `rgba(255, 255, 255, 0.22)`
  - Dark mode sheen: `rgba(255, 255, 255, 0.035)`
- **Card Micro-Lift**: `hover:-translate-y-0.5` with soft paper shadow:
  - Light mode shadow: `0 8px 24px -6px rgba(35, 30, 20, 0.08), 0 2px 6px -1px rgba(35, 30, 20, 0.03)`
  - Dark mode shadow: `0 12px 28px -6px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(222, 219, 200, 0.08)`
- **Tactile Buttons**:
  - Secondary buttons hover from container parchment to crisp white (`hover:bg-white` in light, `dark:hover:bg-surface-container-highest`), accompanied by an elevation lift (`hover:-translate-y-0.5 hover:shadow-md`).
  - Primary carbon buttons elevate with expanded shadow depth (`hover:shadow-lg hover:-translate-y-0.5`).

### 3. Reusing This Palette in Other Projects

Copy the following CSS variable block directly into your target project's `globals.css` or Tailwind configuration:

```css
:root {
  /* Warm Bone Parchment Theme */
  --bg-canvas: #f2efe4;
  --bg-card: #e4e1d2;
  --bg-card-elevated: #dedbc8;
  --text-primary: #1a1a17;
  --text-muted: #5e5c54;
  --border-subtle: #cfcbc0;
  --spotlight-sheen: rgba(255, 255, 255, 0.22);
}

.dark {
  /* Obsidian Carbon Theme */
  --bg-canvas: #10100f;
  --bg-card: #242422;
  --bg-card-elevated: #2f2f2b;
  --text-primary: #dedbc8;
  --text-muted: #a2a095;
  --border-subtle: #3a3935;
  --spotlight-sheen: rgba(255, 255, 255, 0.035);
}
```

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
