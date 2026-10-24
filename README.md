# Ugandhar Vaddi — Personal Engineering Portfolio

Official repository for [ugandhar.in](https://ugandhar.in).

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed for high performance, accessibility, and visual cohesion with [blog.ugandhar.in](https://blog.ugandhar.in).

---

## Architecture Overview

- **Framework**: Next.js 15 App Router with Turbopack support.
- **Styling**: Tailwind CSS with Material Design 3 surface tokens and custom high-contrast dark/light mode.
- **Typography**: Geist Sans (interface), Geist Mono (data and code), and Newsreader (editorial accents).
- **Navigation**: Floating magnetic dock with Framer Motion spring physics on desktop, and a static tap bar on mobile devices.
- **Dynamic Content**: Live RSS synchronization from `https://blog.ugandhar.in/feed.xml` with Incremental Static Regeneration (ISR).
- **Security**: Strict separation of public and proprietary enterprise project metadata.

---

## Content Management Guide

All portfolio data is centralized in a single configuration file:

```
src/data/portfolio.ts
```

### 1. How to Add a New Experience

Open `src/data/portfolio.ts` and append a new object to the `EXPERIENCES` array:

```typescript
{
  company: "Company Name",
  role: "Job Title",
  period: "Month Year – Month Year",
  location: "City, Country (On-site / Remote)",
  type: "Internship", // "Internship" | "Apprenticeship" | "Full-time" | "Contract"
  team: "Optional Team or Division",
  description: "Brief summary of your primary responsibility.",
  bullets: [
    "Key achievement or technical contribution.",
    "Performance metric or architecture improvement.",
    "Tooling or framework implemented."
  ],
  skills: ["Skill 1", "Skill 2", "Skill 3"],
  repoUrl: "https://github.com/uga961/your-repo" // Optional practice repo link
}
```

### 2. How to Add a New Project

To add a public open-source project or an internal proprietary project, append an object to the `PROJECTS` array in `src/data/portfolio.ts`:

**Standard Public Project:**
```typescript
{
  id: "project-id",
  title: "Project Title",
  subtitle: "One-line descriptive subtitle",
  description: "Detailed description of what the project does and how it was built.",
  category: "AI & ML", // "AI & ML" | "Hardware & VLSI" | "Desktop & Web" | "Systems"
  tags: ["Python", "FastAPI", "React"],
  metrics: "Optional key metric (e.g. 30% latency reduction)",
  githubUrl: "https://github.com/uga961/project-repo",
  liveUrl: "https://project.ugandhar.in", // Optional live link
  featured: true,
  date: "Month Year"
}
```

**Proprietary Project (Hides External Links):**
```typescript
{
  id: "internal-tool",
  title: "Internal Tool Name",
  subtitle: "Enterprise Data Extraction System",
  description: "High-level summary of the architecture and business impact.",
  category: "AI & ML",
  tags: ["Google Gemini Vision", "Vertex AI", "Python"],
  isProprietary: true, // Displays 'Proprietary' badge with NO source links
  featured: true,
  date: "Month Year"
}
```

### 3. How to Update or Add YouTube Playlists

In `src/data/portfolio.ts`, navigate to `YOUTUBE_INFO.playlists`. Edit an existing playlist or append a new one:

```typescript
{
  title: "Learn PYTHON in 5 Days or Less",
  description: "Complete hands-on beginner to intermediate series covering Python fundamentals.",
  playlistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID",
  topics: ["Google Colab", "NumPy", "Pandas", "OOP"]
}
```

### 4. How to Update Your Resume or Profile Photo

- **Resume**: Replace the PDF at `public/resume/Resume.pdf`. The website opens it directly in a browser tab without forcing a file download.
- **Profile Photo**: Replace the image at `public/avatar/profile.jpg`.

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

# Start production server
npm start
```

### Vercel Deployment

1. Import the `uga961/portfolio` repository into Vercel.
2. Ensure Framework Preset is detected as **Next.js**.
3. Under Project Settings > Domains, assign `ugandhar.in` and `www.ugandhar.in`.
4. Point DNS `A` record to `76.76.21.21` and `CNAME` for `www` to `cname.vercel-dns.com`.

---

## License

This project is licensed under the [MIT License](./LICENSE) © 2026 Ugandhar Vaddi.
