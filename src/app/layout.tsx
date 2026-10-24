import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe4" },
    { media: "(prefers-color-scheme: dark)", color: "#10100f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ugandhar.in"),
  title: {
    default: "Ugandhar Vaddi — Associate Data Scientist & Systems Builder",
    template: "%s | Ugandhar Vaddi",
  },
  description:
    "Associate Data Scientist at Tredence. Building at the intersection of silicon, software, enterprise data pipelines, and applied machine learning models.",
  keywords: [
    "Ugandhar Vaddi",
    "uga961",
    "Data Scientist",
    "Associate Data Scientist",
    "Tredence Analytics Solutions",
    "McKinsey & Company Intern",
    "Cognizant",
    "Machine Learning",
    "Applied AI",
    "VLSI Design",
    "Cadence Virtuoso",
    "SRAM Architecture",
    "StayActive",
    "Systems Programming",
    "Python",
    ".NET Core",
    "Electronics Engineer",
    "Visakhapatnam",
  ],
  authors: [{ name: "Ugandhar Vaddi", url: "https://ugandhar.in" }],
  creator: "Ugandhar Vaddi",
  publisher: "Ugandhar Vaddi",
  alternates: {
    canonical: "https://ugandhar.in",
  },
  verification: {
    google: "d6qC6JXOnKpcVtH15DHGM1LslxfSPMTZd2mavDkuMY8",
  },
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
    locale: "en_US",
    url: "https://ugandhar.in",
    siteName: "Ugandhar Vaddi",
    title: "Ugandhar Vaddi — Associate Data Scientist & Systems Builder",
    description:
      "Associate Data Scientist at Tredence. Building at the intersection of silicon, software, enterprise data pipelines, and applied machine learning models.",
    images: [
      {
        url: "/social/og-image.png",
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
      "Associate Data Scientist at Tredence. Building at the intersection of silicon, software, enterprise data pipelines, and applied machine learning models.",
    images: ["/social/og-image.png"],
    creator: "@uga961",
    site: "@uga961",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ugandhar.in/#person",
      name: "Ugandhar Vaddi",
      alternateName: "uga961",
      url: "https://ugandhar.in",
      image: "https://ugandhar.in/avatar/profile.jpg",
      jobTitle: "Associate Data Scientist",
      worksFor: {
        "@type": "Organization",
        name: "Tredence Analytics Solutions",
        url: "https://www.tredence.com",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Sathyabama Institute of Science and Technology",
      },
      sameAs: [
        "https://github.com/uga961",
        "https://www.linkedin.com/in/vaddi-ugandhar-b37877266/",
        "https://www.youtube.com/@uga961",
        "https://blog.ugandhar.in",
        "https://www.reddit.com/user/uga961/",
      ],
      knowsAbout: [
        "Data Science",
        "Machine Learning",
        "Applied AI",
        "VLSI Design",
        "SRAM Architectures",
        "System Programming",
        "Python",
        ".NET Core",
        "Predictive Modeling",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ugandhar.in/#website",
      url: "https://ugandhar.in",
      name: "Ugandhar Vaddi",
      description:
        "Building at the intersection of silicon, software, data, and intelligent systems.",
      publisher: {
        "@id": "https://ugandhar.in/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
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
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} font-sans bg-background text-on-surface antialiased selection:bg-primary/20 selection:text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
