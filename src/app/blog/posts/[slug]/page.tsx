import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatDisplayDate } from "@/lib/date";
import { PERSONAL_INFO } from "@/data/portfolio";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { extractTableOfContents } from "@/lib/markdown";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { MagneticDock } from "@/components/ui/MagneticDock";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

const SITE_URL = "https://www.ugandhar.in";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts(false);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, true);

  if (!post) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const postUrl = `${SITE_URL}/blog/posts/${post.slug}`;
  const title = post.title;

  const description =
    post.excerpt || `${post.title} — Written by ${PERSONAL_INFO.name}`;

  const cleanOgImage =
    post.coverImage && post.coverImage.trim() !== ""
      ? post.coverImage
      : `${SITE_URL}/social/og-image.png`;

  const ogImages = [
    {
      url: cleanOgImage,
      alt: title,
      width: 1200,
      height: 630,
    },
  ];

  const isoPublished = post.date ? new Date(post.date).toISOString() : undefined;
  const isoModified = post.lastUpdated
    ? new Date(post.lastUpdated).toISOString()
    : isoPublished;

  return {
    title: `${title} | Ugandhar Vaddi`,
    description,
    authors: [{ name: PERSONAL_INFO.name, url: SITE_URL }],
    creator: PERSONAL_INFO.name,
    publisher: PERSONAL_INFO.name,
    alternates: {
      canonical: postUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: postUrl,
      type: "article",
      publishedTime: isoPublished,
      modifiedTime: isoModified,
      authors: [PERSONAL_INFO.name],
      tags: post.tags,
      images: ogImages,
      siteName: `${PERSONAL_INFO.name} — Technical Journal`,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cleanOgImage],
      creator: "@uga961",
      site: "@uga961",
    },
    other: {
      "dc.creator": PERSONAL_INFO.name,
      "dc.title": title,
      "dc.description": description,
      "article:published_time": isoPublished || "",
      "article:modified_time": isoModified || "",
      "article:author": PERSONAL_INFO.name,
      "article:tag": post.tags.join(", "),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, true);

  if (!post) {
    notFound();
  }

  const formattedDate = formatDisplayDate(post.date, "long");
  const formattedUpdated = formatDisplayDate(post.lastUpdated || post.date, "short");
  const tocItems = extractTableOfContents(post.content);
  const articleUrl = `${SITE_URL}/blog/posts/${post.slug}`;

  // Find related articles (matching tags or other recent posts)
  const allPosts = getAllPosts(false);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aMatches = a.tags.filter((t) => post.tags.includes(t)).length;
      const bMatches = b.tags.filter((t) => post.tags.includes(t)).length;
      return bMatches - aMatches;
    })
    .slice(0, 2);

  const cleanOgImage =
    post.coverImage && post.coverImage.trim() !== ""
      ? post.coverImage
      : `${SITE_URL}/social/og-image.png`;

  const isoPublished = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
  const isoModified = post.lastUpdated
    ? new Date(post.lastUpdated).toISOString()
    : isoPublished;

  // Rich JSON-LD structured data for Google Search (BlogPosting + BreadcrumbList)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        isPartOf: {
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: `${PERSONAL_INFO.name} — Technical Journal & Blog`,
          url: `${SITE_URL}/blog`,
        },
        headline: post.title,
        name: post.title,
        description: post.excerpt || post.title,
        url: articleUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        datePublished: isoPublished,
        dateModified: isoModified,
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: PERSONAL_INFO.name,
          url: SITE_URL,
          image: `${SITE_URL}/avatar/profile.jpg`,
          sameAs: [
            "https://github.com/uga961",
            "https://www.linkedin.com/in/vaddi-ugandhar-b37877266/",
            "https://www.youtube.com/@uga961",
            "https://www.reddit.com/user/uga961/",
          ],
        },
        publisher: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: PERSONAL_INFO.name,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/icon.png`,
          },
        },
        image: cleanOgImage,
        keywords: post.tags.join(", "),
        articleSection: post.tags[0] || "Engineering",
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Portfolio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: `${SITE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-on-surface relative selection:bg-foreground/15 selection:text-foreground pb-24 sm:pb-28">
      <ReadingProgressBar />
      <BlogHeader backTo="/blog" backLabel="All Essays" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-6 pb-4 border-b border-border/80">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors touch-manipulation group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Technical Journal</span>
          </Link>
          <span className="text-border">/</span>
          <span className="truncate max-w-[280px] sm:max-w-md text-foreground/80">
            {post.title}
          </span>
        </div>

        {/* Article Container Grid: Main Reading Column + Optional TOC Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <article className="lg:col-span-8 space-y-8">
            {/* Semantic Header with single H1 */}
            <header className="space-y-4 border-b border-border/80 pb-6 sm:pb-8">
              {/* Category Tag & Reading Time */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-on-surface-variant">
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span className="uppercase tracking-wider font-semibold text-foreground">
                      {post.tags[0]}
                    </span>
                    <span className="text-border">/</span>
                  </>
                )}
                <span>{post.readingTime} min read</span>
                <span className="text-border">/</span>
                <time dateTime={post.date} suppressHydrationWarning>
                  {formattedDate}
                </time>
                {post.lastUpdated && post.lastUpdated !== post.date && (
                  <span className="text-[11px] text-on-surface-variant/70 italic hidden sm:inline">
                    (Updated {formattedUpdated})
                  </span>
                )}
              </div>

              {/* Exact H1 Title for the Page */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] break-words">
                {post.title}
              </h1>

              {/* Excerpt / Lead Paragraph */}
              {post.excerpt && (
                <p className="font-serif text-lg sm:text-xl text-on-surface-variant italic leading-relaxed pt-1">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Share Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full border border-border/80 overflow-hidden bg-surface flex-shrink-0">
                    <Image
                      src="/avatar/profile.jpg"
                      alt={PERSONAL_INFO.name}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-mono">
                    <div className="font-semibold text-foreground">{PERSONAL_INFO.name}</div>
                    <div className="text-[11px] text-on-surface-variant">
                      Associate Data Scientist · Tredence
                    </div>
                  </div>
                </div>

                <ShareButtons url={articleUrl} title={post.title} />
              </div>
            </header>

            {/* Mobile Table of Contents Accordion */}
            {tocItems.length > 2 && (
              <div className="block lg:hidden border border-border/80 rounded-[4px] p-4 bg-surface/50">
                <TableOfContents items={tocItems} />
              </div>
            )}

            {/* Article Markdown Body */}
            <MarkdownRenderer content={post.content} />

            {/* Tags footer */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-border/80 flex flex-wrap items-center gap-1.5 text-xs font-mono">
                <span className="text-on-surface-variant font-semibold mr-1">TOPICS:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-[2px] bg-surface border border-border/80 text-foreground/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Related Articles Carousel / Links */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 border-t border-border/80 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
                  <span className="uppercase tracking-wider font-semibold text-foreground">
                    FURTHER READING
                  </span>
                  <Link href="/blog" className="hover:underline flex items-center gap-1">
                    <span>All Essays</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/posts/${related.slug}`}
                      className="p-4 rounded-[4px] border border-border/80 bg-surface/50 hover:bg-surface hover:border-foreground/30 transition-all block group"
                    >
                      <div className="text-[11px] font-mono text-on-surface-variant mb-1">
                        {formatDisplayDate(related.date, "short")} · {related.readingTime} min read
                      </div>
                      <h4 className="font-serif text-base font-bold text-foreground group-hover:underline leading-snug line-clamp-2">
                        {related.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Desktop Sticky Table of Contents Sidebar */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
              <div className="rounded-[4px] border border-border/80 bg-surface/40 p-5 shadow-subtle">
                <TableOfContents items={tocItems} />
              </div>

              <div className="rounded-[4px] border border-border/80 bg-surface/40 p-5 space-y-3 text-xs font-mono text-on-surface-variant">
                <div className="text-foreground font-semibold uppercase tracking-wider">
                  ABOUT THE AUTHOR
                </div>
                <p className="text-xs leading-relaxed font-sans text-on-surface-variant">
                  Ugandhar is an Associate Data Scientist at Tredence exploring the interplay between low-level silicon architectures and scalable applied machine learning systems.
                </p>
                <div className="pt-1 flex items-center gap-3">
                  <Link href="/" className="text-foreground hover:underline">
                    Portfolio
                  </Link>
                  <span className="text-border">/</span>
                  <a
                    href="https://github.com/uga961"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    GitHub
                  </a>
                  <span className="text-border">/</span>
                  <a
                    href="https://www.linkedin.com/in/vaddi-ugandhar-b37877266/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>

      <BlogFooter />
      <MagneticDock />
    </div>
  );
}
