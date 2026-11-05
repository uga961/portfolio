import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatDisplayDate } from "@/lib/date";
import { PERSONAL_INFO } from "@/data/portfolio";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { extractTableOfContents } from "@/lib/markdown";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogDock } from "@/components/blog/BlogDock";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

const SITE_URL = "https://www.ugandhar.in";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Builds high-ranking intent keywords for Google & Bing discovery,
 * including exact query variants like "how to debloat tv by ugandhar vaddi".
 */
function getArticleSearchKeywords(post: {
  slug: string;
  title: string;
  tags: string[];
}): string[] {
  const author = PERSONAL_INFO.name;
  const base = [
    `${post.title} by ${author}`,
    `${post.title} ${author}`,
    `${author} ${post.title}`,
    `${author} blog`,
    `${author} technical journal`,
    "Ugandhar Vaddi",
    "ugandhar.in/blog",
    ...post.tags,
  ];

  if (post.slug === "debloat-android-tv-adb-guide") {
    base.push(
      "how to debloat tv by ugandhar vaddi",
      "how to debloat android tv using adb",
      "how to debloat android tv by ugandhar vaddi",
      "debloat android tv adb guide ugandhar",
      "tv detox launcher ugandhar vaddi",
      "remove bloatware android tv adb wifi",
      "xiaomi mi tv adb debloat guide",
      "android tv adb shell debloat",
      "clean up slow android tv ugandhar"
    );
  } else if (post.slug === "mckinsey-interview-day-and-results") {
    base.push(
      "mckinsey interview experience ugandhar vaddi",
      "mckinsey interview day and results ugandhar vaddi",
      "mckinsey associate data scientist interview chennai",
      "data scientist interview mckinsey ugandhar",
      "mckinsey case interview reflection"
    );
  } else if (post.slug === "why-i-built-stayactive") {
    base.push(
      "why i built stayactive ugandhar vaddi",
      "stayactive windows app ugandhar vaddi",
      "stayactive ergonomics utility ugandhar",
      "smart meeting detection wellness app"
    );
  } else if (post.slug === "transforming-fedora-into-unified-macos-grade-desktop") {
    base.push(
      "transforming fedora into macos desktop ugandhar vaddi",
      "fedora gnome customization ugandhar vaddi",
      "fedora wayland macos theme guide ugandhar",
      "gnome shell 50 styling fedora linux"
    );
  } else if (post.slug === "python-data-visualization-matplotlib-seaborn-guide") {
    base.push(
      "python data visualization matplotlib seaborn ugandhar vaddi",
      "python data analysis guide ugandhar vaddi",
      "google colab python visualization tutorial ugandhar"
    );
  } else if (post.slug === "rbi-500-rupee-note-quality-control") {
    base.push(
      "rbi 500 rupee note quality control ugandhar vaddi",
      "reserve bank of india note alignment ugandhar",
      "currency quality control investigation ugandhar"
    );
  }

  return Array.from(new Set(base));
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
  const keywords = getArticleSearchKeywords(post);

  // SEO Title optimized for search indexing: "Title — By Ugandhar Vaddi"
  const title = `${post.title} — By ${PERSONAL_INFO.name}`;

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
    title,
    description,
    keywords,
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
      "article:published_time": isoPublished || "",
      "article:modified_time": isoModified || "",
      "article:author": PERSONAL_INFO.name,
      "article:section": post.tags[0] || "Engineering",
      "article:tag": post.tags.join(", "),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, false);

  if (!post) {
    notFound();
  }

  // Find related articles (by matching tags or recency)
  const allPosts = getAllPosts(false);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aMatches = a.tags.filter((t) => post.tags.includes(t)).length;
      const bMatches = b.tags.filter((t) => post.tags.includes(t)).length;
      return bMatches - aMatches;
    })
    .slice(0, 2);

  const tocItems = extractTableOfContents(post.content);

  const formattedDate = formatDisplayDate(post.date, "long");
  const formattedUpdated = post.lastUpdated
    ? formatDisplayDate(post.lastUpdated, "long")
    : null;

  const articleUrl = `${SITE_URL}/blog/posts/${post.slug}`;
  const cleanOgImage =
    post.coverImage && post.coverImage.trim() !== ""
      ? post.coverImage
      : `${SITE_URL}/social/og-image.png`;

  const isoPublished = post.date ? new Date(post.date).toISOString() : undefined;
  const isoModified = post.lastUpdated
    ? new Date(post.lastUpdated).toISOString()
    : isoPublished;

  const searchKeywords = getArticleSearchKeywords(post);

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
        alternativeHeadline: `${post.title} by ${PERSONAL_INFO.name}`,
        name: `${post.title} — By ${PERSONAL_INFO.name}`,
        description: post.excerpt || post.title,
        url: articleUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        datePublished: isoPublished,
        dateModified: isoModified,
        isAccessibleForFree: "True",
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: PERSONAL_INFO.name,
          url: SITE_URL,
          jobTitle: "Associate Data Scientist",
          worksFor: {
            "@type": "Organization",
            name: "Tredence Analytics Solutions",
            url: "https://www.tredence.com",
          },
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
        keywords: searchKeywords.join(", "),
        articleSection: post.tags[0] || "Engineering",
        about: [
          ...post.tags.map((t) => ({ "@type": "Thing", name: t })),
          { "@type": "Person", name: PERSONAL_INFO.name },
        ],
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
      {/* BlogHeader brand always links to /blog */}
      <BlogHeader backTo="/blog" backLabel="All Essays" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-8 pb-4 border-b border-border/80">
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

        {/* Clean Centered Editorial Reading Column (matching portfolio width & rhythm) */}
        <div className="w-full max-w-3xl lg:max-w-[860px] mx-auto space-y-10">
          {/* Article Header */}
          <header className="space-y-4 border-b border-border/80 pb-6 sm:pb-8">
            {/* Metadata Row — SEO tag badge without internal filter link */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-on-surface-variant">
              {post.tags && post.tags.length > 0 && (
                <>
                  <span className="uppercase tracking-wider font-semibold text-foreground font-mono">
                    #{post.tags[0]}
                  </span>
                  <span className="text-border">·</span>
                </>
              )}
              <span>{post.readingTime} min read</span>
              <span className="text-border">·</span>
              <time dateTime={post.date} suppressHydrationWarning>
                {formattedDate}
              </time>
              {post.lastUpdated && post.lastUpdated !== post.date && (
                <>
                  <span className="text-border">·</span>
                  <span className="rounded-[2px] bg-surface px-1.5 py-0.5 text-[10px] font-mono text-on-surface-variant border border-border/70">
                    Updated {formattedUpdated}
                  </span>
                </>
              )}
            </div>

            {/* Exact H1 Title for the Page */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2] break-words">
              {post.title}
            </h1>

            {/* Excerpt / Lead Paragraph */}
            {post.excerpt && (
              <p className="font-serif text-lg sm:text-xl text-on-surface-variant italic leading-relaxed pt-1">
                {post.excerpt}
              </p>
            )}

            {/* Author Bar */}
            <div className="flex items-center gap-3 pt-4 border-t border-border/60">
              <div className="h-9 w-9 rounded-full border border-border/80 overflow-hidden bg-surface flex-shrink-0">
                <Image
                  src={PERSONAL_INFO.avatarPath}
                  alt={PERSONAL_INFO.name}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xs font-mono">
                <div className="font-semibold text-foreground">{PERSONAL_INFO.name}</div>
                <div className="text-[11px] text-on-surface-variant">
                  Associate Data Scientist · Tredence · Chennai
                </div>
              </div>
            </div>
          </header>

          {/* Cover Image if present */}
          {post.coverImage && (
            <div className="overflow-hidden rounded-[4px] border border-border/80 bg-surface-container relative aspect-[16/9] w-full">
              <Image
                src={post.coverImage}
                alt={`${post.title} — By ${PERSONAL_INFO.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 860px"
                className="object-cover"
              />
            </div>
          )}

          {/* Inline Collapsible Table of Contents */}
          {tocItems.length > 1 && <TableOfContents items={tocItems} />}

          {/* Article Markdown Body */}
          <div className="w-full">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Post-Article Actions & Author Section */}
          <section className="space-y-8 border-t border-border/80 pt-8">
            {/* Topic Tags — Static semantic metadata chips for search engine context */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                <span className="text-on-surface-variant font-semibold mr-1">TOPICS:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-[3px] bg-surface/70 border border-border/80 text-foreground/80 font-mono text-[11px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Bar: Published Date + Share Buttons positioned at bottom */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs border-y border-border/60 py-4">
              <div className="space-y-0.5 text-on-surface-variant">
                <div>
                  Published on{" "}
                  <strong className="text-foreground font-semibold">
                    {formattedDate}
                  </strong>{" "}
                  by <strong className="text-foreground">{PERSONAL_INFO.name}</strong>
                </div>
                {post.lastUpdated && post.lastUpdated !== post.date && (
                  <div className="text-[11px] text-on-surface-variant/80">
                    Last modified {formattedUpdated}
                  </div>
                )}
              </div>

              <ShareButtons url={articleUrl} title={post.title} />
            </div>

            {/* About the Author Card — Full Width Editorial Box */}
            <div className="rounded-[4px] border border-border/80 bg-surface/50 p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 transition-colors">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-border/80 overflow-hidden bg-surface flex-shrink-0">
                <Image
                  src={PERSONAL_INFO.avatarPath}
                  alt={PERSONAL_INFO.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-foreground font-sans">
                    {PERSONAL_INFO.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-on-surface-variant">
                    <Link href="/" className="hover:text-foreground hover:underline">
                      Portfolio
                    </Link>
                    <span className="text-border">·</span>
                    <a
                      href="https://github.com/uga961"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground hover:underline"
                    >
                      GitHub
                    </a>
                    <span className="text-border">·</span>
                    <a
                      href="https://www.linkedin.com/in/vaddi-ugandhar-b37877266/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
                <p className="text-xs font-mono text-on-surface-variant">
                  Associate Data Scientist at Tredence · Chennai, India
                </p>
                <p className="text-xs leading-relaxed text-on-surface-variant font-sans pt-1">
                  Writing on data manipulation workflows, technical interviews,
                  systems architectures, and open-source tooling.
                </p>
              </div>
            </div>

            {/* Further Reading / Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
                  <span className="uppercase tracking-wider font-semibold text-foreground">
                    FURTHER READING
                  </span>
                  <Link
                    href="/blog"
                    className="hover:text-foreground hover:underline flex items-center gap-1"
                  >
                    <span>All Essays</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/posts/${related.slug}`}
                      className="p-4 sm:p-5 rounded-[4px] border border-border/80 bg-surface/40 hover:bg-surface/80 hover:border-foreground/30 transition-all block group shadow-subtle"
                    >
                      <div className="text-[11px] font-mono text-on-surface-variant mb-1.5">
                        {formatDisplayDate(related.date, "short")} · {related.readingTime} min read
                      </div>
                      <h4 className="font-serif text-base font-bold text-foreground group-hover:underline leading-snug line-clamp-2">
                        {related.title}
                      </h4>
                      <div className="mt-3 flex items-center gap-1 text-xs font-mono text-foreground font-semibold">
                        <span>Read essay</span>
                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <BlogFooter />
      {/* BlogDock configured for single article page */}
      <BlogDock mode="post" postTitle={post.title} postUrl={articleUrl} />
    </div>
  );
}
