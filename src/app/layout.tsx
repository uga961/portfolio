import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ugandhar.in"),
  title: {
    default: "Ugandhar Vaddi — Associate Data Scientist & Systems Builder",
    template: "%s | Ugandhar Vaddi",
  },
  description:
    "Associate Data Scientist at Tredence and Electronics Engineer. Building across silicon architectures, enterprise predictive pipelines, and systems tooling.",
  keywords: [
    "Ugandhar Vaddi",
    "uga961",
    "Data Scientist",
    "Associate Data Scientist",
    "Tredence Analytics Solutions",
    "McKinsey & Company Intern",
    "Cognizant Apprentice",
    "Machine Learning",
    "Applied AI",
    "VLSI Design",
    "Cadence Virtuoso",
    "SRAM Architecture",
    "StayActive",
    "TV Detox Launcher",
    "Android TV",
    "ADB",
    "Systems Programming",
    "Python",
    "Java",
    ".NET Core",
    "Electronics Engineer",
    "Visakhapatnam",
    "Chennai",
  ],
  authors: [{ name: "Ugandhar Vaddi", url: "https://www.ugandhar.in" }],
  creator: "Ugandhar Vaddi",
  publisher: "Ugandhar Vaddi",
  alternates: {
    canonical: "https://www.ugandhar.in",
  },
  // verification: {
  //   google: "Add your Google site verification code here",
  // },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Ugandhar",
    lastName: "Vaddi",
    username: "uga961",
    gender: "male",
    locale: "en_US",
    url: "https://www.ugandhar.in",
    siteName: "Ugandhar Vaddi",
    title: "Ugandhar Vaddi — Associate Data Scientist & Systems Builder",
    description:
      "Associate Data Scientist at Tredence and Electronics Engineer. Building across silicon architectures, enterprise predictive pipelines, and systems tooling.",
    images: [
      {
        url: "https://www.ugandhar.in/social/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ugandhar Vaddi — Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ugandhar Vaddi — Associate Data Scientist & Systems Builder",
    description:
      "Associate Data Scientist at Tredence and Electronics Engineer. Building across silicon architectures, enterprise predictive pipelines, and systems tooling.",
    images: ["https://www.ugandhar.in/social/og-image.png"],
    creator: "@uga961",
    site: "@uga961",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.ugandhar.in/#person",
      name: "Ugandhar Vaddi",
      alternateName: ["uga961", "VADDI UGANDHAR"],
      url: "https://www.ugandhar.in",
      image: {
        "@type": "ImageObject",
        url: "https://www.ugandhar.in/avatar/profile.jpg",
        width: 640,
        height: 640,
        caption: "Ugandhar Vaddi",
      },
      logo: "https://www.ugandhar.in/icon.png",
      jobTitle: "Associate Data Scientist",
      description:
        "Associate Data Scientist at Tredence (Analytics & Applied AI) & Electronics Engineer. Building at the intersection of silicon, enterprise data pipelines, and applied machine learning models.",
      worksFor: {
        "@type": "Organization",
        name: "Tredence Analytics Solutions",
        url: "https://www.tredence.com",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Associate Data Scientist",
        occupationalCategory: "15-2051.00",
        skills:
          "Machine Learning, Predictive Analytics, Python, SQL, VLSI CAD, SRAM Architectures, C/C++",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Sathyabama Institute of Science and Technology",
          url: "https://www.sathyabama.ac.in",
        },
      ],
      sameAs: [
        "https://github.com/uga961",
        "https://www.linkedin.com/in/vaddi-ugandhar-b37877266/",
        "https://www.youtube.com/@uga961",
        "https://thoughts.ugandhar.in",
        "https://www.reddit.com/user/uga961/",
      ],
      knowsAbout: [
        "Data Science",
        "Machine Learning",
        "Applied AI",
        "VLSI Design",
        "SRAM Architectures",
        "Cadence Virtuoso",
        "Computer Vision",
        "Multi-Agent Systems",
        "System Programming",
        "Android Systems & ADB",
        "Python",
        "Java",
        ".NET Core",
        "Predictive Modeling",
        "Embedded Systems",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Visakhapatnam",
        addressRegion: "Andhra Pradesh",
        addressCountry: "IN",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.ugandhar.in/#webpage",
      url: "https://www.ugandhar.in",
      name: "Ugandhar Vaddi — Personal Engineering Portfolio",
      isPartOf: {
        "@id": "https://www.ugandhar.in/#website",
      },
      about: {
        "@id": "https://www.ugandhar.in/#person",
      },
      mainEntity: {
        "@id": "https://www.ugandhar.in/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.ugandhar.in/#website",
      url: "https://www.ugandhar.in",
      name: "Ugandhar Vaddi",
      alternateName: ["Ugandhar", "ugandhar.in", "Ugandhar Vaddi Portfolio"],
      image: "https://www.ugandhar.in/icon.png",
      thumbnailUrl: "https://www.ugandhar.in/icon.png",
      description:
        "Building at the intersection of silicon, software, data, and intelligent systems.",
      publisher: {
        "@id": "https://www.ugandhar.in/#person",
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} font-sans bg-background text-on-surface antialiased selection:bg-foreground/15 selection:text-foreground`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
