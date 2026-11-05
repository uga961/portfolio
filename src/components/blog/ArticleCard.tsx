import React from "react";
import Link from "next/link";
import { formatDisplayDate } from "@/lib/date";
import { ArrowUpRight } from "lucide-react";
import { Post, PostSummary } from "@/lib/posts";

export interface ArticleCardProps {
  post: Post | PostSummary;
}

export function ArticleCard({ post }: ArticleCardProps) {
  const formattedDate = formatDisplayDate(post.date, "short");

  return (
    <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start group hover:bg-surface/40 -mx-3 px-3 rounded-[4px] transition-colors">
      {/* Left Column: Metadata */}
      <div className="md:col-span-3 space-y-1 text-xs font-mono text-on-surface-variant">
        <div className="text-foreground font-semibold">
          <time dateTime={post.date} suppressHydrationWarning>
            {formattedDate}
          </time>
        </div>
        <div>{post.readingTime} min read</div>
      </div>

      {/* Right Column: Title, Excerpt, SEO Tags, Arrow */}
      <div className="md:col-span-9 space-y-2.5">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/blog/posts/${post.slug}`}
            prefetch={false}
            className="group/title block touch-manipulation"
          >
            <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground group-hover/title:underline transition-colors leading-snug break-words">
              {post.title}
            </h3>
          </Link>
          <Link
            href={`/blog/posts/${post.slug}`}
            aria-label={`Read ${post.title} by Ugandhar Vaddi`}
            className="p-1 text-on-surface-variant hover:text-foreground hover:translate-x-0.5 hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {post.excerpt && (
          <Link href={`/blog/posts/${post.slug}`} prefetch={false} className="block">
            <p className="text-sm text-on-surface-variant leading-relaxed font-sans line-clamp-2 sm:line-clamp-3">
              {post.excerpt}
            </p>
          </Link>
        )}

        {/* SEO Tag Chips — Static metadata for search engines */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs font-mono text-on-surface-variant/80 break-words">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-on-surface-variant/70 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
