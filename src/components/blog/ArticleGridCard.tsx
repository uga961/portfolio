import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDisplayDate } from "@/lib/date";
import { ArrowUpRight } from "lucide-react";
import { Post, PostSummary } from "@/lib/posts";

export interface ArticleGridCardProps {
  post: Post | PostSummary;
  onSelectTag?: (tag: string) => void;
}

export function ArticleGridCard({ post, onSelectTag }: ArticleGridCardProps) {
  const formattedDate = formatDisplayDate(post.date, "short");

  return (
    <div className="group flex flex-col justify-between rounded-[4px] border border-border/80 bg-surface/50 p-4 sm:p-5 transition-all hover:border-foreground/30 hover:bg-surface/80 shadow-subtle">
      <div className="space-y-3.5">
        {/* Cover Image if present */}
        {post.coverImage && (
          <Link
            href={`/blog/posts/${post.slug}`}
            prefetch={false}
            className="block overflow-hidden rounded-[3px] border border-border/70 bg-surface-container relative aspect-[16/9] w-full"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover transition-all duration-300 group-hover:scale-[1.02]"
            />
          </Link>
        )}

        {/* Metadata row */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant">
          <span className="text-foreground font-semibold">
            <time dateTime={post.date} suppressHydrationWarning>
              {formattedDate}
            </time>
          </span>
          <span className="text-border">·</span>
          <span>{post.readingTime} min read</span>
        </div>

        {/* Title */}
        <Link href={`/blog/posts/${post.slug}`} prefetch={false} className="block">
          <h3 className="text-base sm:text-lg font-serif font-bold text-foreground group-hover:underline transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <Link href={`/blog/posts/${post.slug}`} prefetch={false} className="block">
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-sans line-clamp-2 sm:line-clamp-3">
              {post.excerpt}
            </p>
          </Link>
        )}
      </div>

      <div className="pt-4 mt-auto border-t border-border/60 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {post.tags && post.tags.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onSelectTag) {
                  onSelectTag(post.tags[0]);
                }
              }}
              className="text-[11px] text-on-surface-variant hover:text-foreground hover:underline transition-colors truncate max-w-[180px] cursor-pointer"
            >
              #{post.tags[0]}
            </button>
          )}
        </div>

        <Link
          href={`/blog/posts/${post.slug}`}
          className="text-foreground font-semibold flex items-center gap-0.5 hover:underline touch-manipulation"
        >
          <span>Read</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
