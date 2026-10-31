import { BlogPost, BLOG_POSTS, PERSONAL_INFO } from "@/data/portfolio";

export async function getLiveBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("https://thoughts.ugandhar.in/feed.xml", {
      next: { revalidate: 60 }, // Re-check feed every 60 seconds for near real-time updates
      headers: {
        "User-Agent": "ugandhar.in-feed-fetcher/2.0",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!res.ok) {
      return BLOG_POSTS;
    }

    const xmlText = await res.text();
    const rawItems: Array<{
      title: string;
      url: string;
      excerpt: string;
      date: string;
      tags: string[];
    }> = [];

    // Parse RSS XML items using regex for lightweight Node & Edge runtime compatibility
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match: RegExpExecArray | null;

    while ((match = itemRegex.exec(xmlText)) !== null && rawItems.length < 6) {
      const itemContent = match[1];

      const titleMatch = /<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i.exec(itemContent);
      const linkMatch = /<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/i.exec(itemContent);
      const descMatch = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i.exec(itemContent);
      const dateMatch = /<pubDate>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/pubDate>/i.exec(itemContent);

      // Extract all genuine category tags from the RSS item
      const catRegex = /<category>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/category>/gi;
      const categories: string[] = [];
      let catMatch: RegExpExecArray | null;
      while ((catMatch = catRegex.exec(itemContent)) !== null) {
        const tag = catMatch[1].trim();
        if (tag && !categories.includes(tag)) {
          categories.push(tag);
        }
      }

      if (titleMatch && linkMatch) {
        let cleanDesc = (descMatch ? descMatch[1] : "")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        if (cleanDesc.length > 200) {
          cleanDesc = cleanDesc.substring(0, 197) + "...";
        }

        let formattedDate = "Recent";
        if (dateMatch) {
          try {
            const d = new Date(dateMatch[1]);
            formattedDate = d.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
          } catch {
            formattedDate = dateMatch[1];
          }
        }

        const rawUrl = linkMatch[1].trim();
        const normalizedUrl = rawUrl.replace(
          /^https?:\/\/blog\.ugandhar\.in/i,
          `https://${PERSONAL_INFO.blogDomain}`
        );

        rawItems.push({
          title: titleMatch[1].trim(),
          url: normalizedUrl,
          excerpt: cleanDesc || `Read the complete technical essay on ${PERSONAL_INFO.blogDomain}.`,
          date: formattedDate,
          tags: categories.length > 0 ? categories : ["Engineering", "Notes"],
        });
      }
    }

    if (rawItems.length === 0) {
      return BLOG_POSTS;
    }

    // Automatically fetch exact reading times from the actual blog post pages
    const enrichedItems: BlogPost[] = await Promise.all(
      rawItems.map(async (item) => {
        let readTime = "5 min read";
        try {
          const postRes = await fetch(item.url, {
            next: { revalidate: 3600 },
            headers: { "User-Agent": "ugandhar.in-reading-time/2.0" },
          });

          if (postRes.ok) {
            const html = await postRes.text();
            // Look for reading time markup rendered by the blog (e.g. "11 min read")
            const match = html.match(/(\d+)\s*(?:<!-- -->)?\s*min read/i);
            if (match) {
              readTime = `${match[1]} min read`;
            }
          }
        } catch (_) {
          // Graceful fallback if individual post page fetch is unreachable
        }

        return {
          title: item.title,
          url: item.url,
          excerpt: item.excerpt,
          date: item.date,
          readTime,
          tags: item.tags,
        };
      })
    );

    return enrichedItems;
  } catch (err) {
    console.warn("Failed fetching live blog feed, falling back to static posts:", err);
    return BLOG_POSTS;
  }
}
