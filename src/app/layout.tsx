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
  themeColor: "#0f1412",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ugandhar.in"),
  title: "Ugandhar Vaddi — Data Scientist · Systems & Hardware Engineer",
  description:
    "Building at the intersection of silicon, software, data, and intelligent systems. Personal portfolio of Ugandhar Vaddi.",
  keywords: [
    "Ugandhar Vaddi",
    "Data Scientist",
    "Electronics Engineer",
    "VLSI",
    "SRAM Design",
    "StayActive",
    "McKinsey Intern",
    "Cadence Virtuoso",
    "Python",
    ".NET",
    "Systems Engineer",
  ],
  authors: [{ name: "Ugandhar Vaddi", url: "https://ugandhar.in" }],
  creator: "Ugandhar Vaddi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ugandhar.in",
    siteName: "Ugandhar Vaddi Portfolio",
    title: "Ugandhar Vaddi — Data Scientist · Systems & Hardware Engineer",
    description:
      "Building at the intersection of silicon, software, data, and intelligent systems.",
    images: [
      {
        url: "/social/og-image blog.png",
        width: 1200,
        height: 630,
        alt: "Ugandhar Vaddi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ugandhar Vaddi — Data Scientist · Systems & Hardware Engineer",
    description:
      "Building at the intersection of silicon, software, data, and intelligent systems.",
    images: ["/social/og-image blog.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
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
