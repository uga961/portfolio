import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { formatDisplayDate } from "@/lib/date";
import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import { PERSONAL_INFO } from "@/data/portfolio";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { HeroBanner } from "@/components/blog/HeroBanner";
import { ArticleList } from "@/components/blog/ArticleList";
import { BlogDock } from "@/components/blog/BlogDock";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Ugandhar Vaddi Blog | Technical Journal & Systems Architecture",
  description:
    "Official blog and engineering journal by Ugandhar Vaddi. Long-form essays on data manipulation workflows, systems architectures, technical interviews, performance engineering, and open-source tooling.",
  keywords: [
    "Ugandhar Vaddi",
    "Ugandhar Vaddi blog",
    "ugandhar vaddi blog",
    "Ugandhar's Blog",
    "Ugandhar Vaddi Technical Journal",
    "how to debloat tv by ugandhar vaddi",
    "How I Debloated My Android TV Ugandhar Vaddi",
    "debloat android tv adb guide ugandhar",
    "McKinsey interview experience Ugandhar Vaddi",
    "Why I Built StayActive Ugandhar Vaddi",
    "Transforming Fedora into macOS desktop Ugandhar Vaddi",
    "Python data visualization guide Ugandhar Vaddi",
    "Associate Data Scientist Tredence blog",
    "Technical Journal",
    "Systems Architecture",
    "Android TV ADB",
  ],
  alternates: {
    canonical: "https://www.ugandhar.in/blog",
    types: {
      "application/rss+xml": "https://www.ugandhar.in/feed.xml",
    },
  },
  openGraph: {
    title: "Ugandhar Vaddi Blog | Technical Journal & Systems Architecture",
    description:
      "Official blog and engineering journal by Ugandhar Vaddi. Long-form essays on data manipulation workflows, systems architectures, technical interviews, performance engineering, and open-source tooling.",
    url: "https://www.ugandhar.in/blog",
    siteName: "Ugandhar Vaddi Blog",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.ugandhar.in/social/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ugandhar Vaddi Blog — Technical Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ugandhar Vaddi Blog | Technical Journal & Systems Architecture",
    description:
      "Official blog and engineering journal by Ugandhar Vaddi. Long-form essays on data manipulation workflows, systems architectures, technical interviews, and systems engineering.",
    images: ["https://www.ugandhar.in/social/og-image.png"],
    creator: "@uga961",
    site: "@uga961",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts(false).map(({ content, ...summary }) => summary);
  const featured = getFeaturedPost();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://www.ugandhar.in/blog#blog",
        name: "Ugandhar Vaddi Blog",
        alternateName: [
          "Ugandhar Vaddi's Blog",
          "Ugandhar Vaddi Technical Journal",
          "Ugandhar Blog",
          "Ugandhar Vaddi Engineering Blog",
        ],
        url: "https://www.ugandhar.in/blog",
        description:
          "Official blog and engineering journal by Ugandhar Vaddi. Long-form essays on data manipulation workflows, systems architectures, technical interviews, performance engineering, and open-source tooling.",
        publisher: {
          "@type": "Person",
          name: PERSONAL_INFO.name,
          url: "https://www.ugandhar.in",
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `https://www.ugandhar.in/blog/posts/${post.slug}#article`,
          headline: post.title,
          alternativeHeadline: `${post.title} by ${PERSONAL_INFO.name}`,
          name: `${post.title} — By ${PERSONAL_INFO.name}`,
          url: `https://www.ugandhar.in/blog/posts/${post.slug}`,
          datePublished: post.date ? new Date(post.date).toISOString() : undefined,
          dateModified: post.lastUpdated
            ? new Date(post.lastUpdated).toISOString()
            : post.date
            ? new Date(post.date).toISOString()
            : undefined,
          description: post.excerpt,
          author: {
            "@type": "Person",
            name: PERSONAL_INFO.name,
            url: "https://www.ugandhar.in",
          },
          image:
            post.coverImage && post.coverImage.trim() !== ""
              ? post.coverImage
              : "https://www.ugandhar.in/social/og-image.png",
          publisher: {
            "@type": "Person",
            name: PERSONAL_INFO.name,
            url: "https://www.ugandhar.in",
            logo: {
              "@type": "ImageObject",
              url: "https://www.ugandhar.in/icon.png",
            },
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.ugandhar.in/blog#itemlist",
        name: "Latest Technical Articles and Guides by Ugandhar Vaddi",
        itemListElement: posts.map((post, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: `${post.title} — By ${PERSONAL_INFO.name}`,
          url: `https://www.ugandhar.in/blog/posts/${post.slug}`,
        })),
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-on-surface relative selection:bg-foreground/15 selection:text-foreground pb-24 sm:pb-28">
      <BlogHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Author Intro Hero Banner */}
        <HeroBanner totalPosts={posts.length} />

        {/* Featured Story / Latest Story Preview */}
        {featured && (
          <section id="featured" className="scroll-mt-28 space-y-6">
            <div className="flex items-center justify-between border-b border-border/80 pb-3 text-xs font-mono text-on-surface-variant">
              <div className="flex items-center gap-2 sm:gap-3 truncate">
                <span className="text-foreground font-semibold uppercase tracking-wider flex-shrink-0">
                  INDEX 002
                </span>
                <span className="text-border flex-shrink-0">/</span>
                <span className="truncate">LATEST ESSAY PREVIEW</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0 font-mono text-[11px]">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="text-foreground font-medium">FEATURED ARTICLE</span>
              </div>
            </div>

            <div className="rounded-[4px] border border-border/80 bg-surface/60 p-5 sm:p-7 transition-colors hover:border-foreground/30 group">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                {featured.coverImage && (
                  <div className="md:col-span-5 overflow-hidden rounded-[3px] border border-border/80 bg-surface-container aspect-[16/10] relative">
                    <Image
                      src={featured.coverImage}
                      alt={`${featured.title} — Written by ${PERSONAL_INFO.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 380px, 340px"
                      priority
                      className="object-cover transition-all duration-500 ease-out"
                    />
                  </div>
                )}

                <div
                  className={`${
                    featured.coverImage ? "md:col-span-7" : "md:col-span-12"
                  } space-y-3.5`}
                >
                  {/* Metadata Row */}
                  <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
                    <span className="text-foreground font-semibold">
                      <time dateTime={featured.date} suppressHydrationWarning>
                        {formatDisplayDate(featured.date, "long")}
                      </time>
                    </span>
                    <span className="text-border">·</span>
                    <span>{featured.readingTime} min read</span>
                    {featured.tags && featured.tags.length > 0 && (
                      <>
                        <span className="text-border">·</span>
                        <span className="text-on-surface-variant/80">
                          #{featured.tags[0]}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:underline transition-colors leading-snug">
                    <Link href={`/blog/posts/${featured.slug}`} prefetch={false}>
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="line-clamp-3 text-sm leading-relaxed text-on-surface-variant font-sans">
                    {featured.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/blog/posts/${featured.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-foreground uppercase tracking-wider hover:underline touch-manipulation"
                    >
                      <span>Read Full Essay</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Articles Section */}
        <section id="articles" className="scroll-mt-28 space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-3 text-xs font-mono text-on-surface-variant">
            <div className="flex items-center gap-2 sm:gap-3 truncate">
              <span className="text-foreground font-semibold uppercase tracking-wider flex-shrink-0">
                INDEX 003
              </span>
              <span className="text-border flex-shrink-0">/</span>
              <span className="truncate">ALL ESSAYS &amp; WRITING</span>
            </div>
            <span className="font-mono text-[11px] text-foreground font-semibold flex-shrink-0">
              {posts.length} {posts.length === 1 ? "ESSAY" : "ESSAYS"}
            </span>
          </div>

          <ArticleList posts={posts} postsPerPage={6} />
        </section>
      </main>

      <BlogFooter />

      {/* Floating Quick Navigation Dock */}
      <BlogDock mode="index" />
    </div>
  );
}
