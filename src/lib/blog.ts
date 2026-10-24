import { BlogPost, BLOG_POSTS } from "@/data/portfolio";

export async function getLiveBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("https://blog.ugandhar.in/feed.xml", {
      next: { revalidate: 3600 }, // ISR cache for 1 hour
      headers: {
        "User-Agent": "ugandhar.in-feed-fetcher/1.0",
      },
    });

    if (!res.ok) {
      return BLOG_POSTS;
    }

    const xmlText = await res.text();
    const items: BlogPost[] = [];

    // Parse RSS XML items using regex for lightweight edge/node runtime compatibility
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match: RegExpExecArray | null;

    while ((match = itemRegex.exec(xmlText)) !== null && items.length < 6) {
      const itemContent = match[1];

      const titleMatch = /<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i.exec(itemContent);
      const linkMatch = /<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/i.exec(itemContent);
      const descMatch = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i.exec(itemContent);
      const dateMatch = /<pubDate>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/pubDate>/i.exec(itemContent);

      if (titleMatch && linkMatch) {
        let cleanDesc = (descMatch ? descMatch[1] : "")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        if (cleanDesc.length > 170) {
          cleanDesc = cleanDesc.substring(0, 167) + "...";
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

        // Estimate reading time from description length or default
        const readTime = `${Math.max(5, Math.min(25, Math.ceil(cleanDesc.length / 15)))} min read`;

        items.push({
          title: titleMatch[1].trim(),
          url: linkMatch[1].trim(),
          excerpt: cleanDesc || "Read the complete technical essay on blog.ugandhar.in.",
          date: formattedDate,
          readTime,
          tags: ["Engineering", "Tech", "Notes"],
        });
      }
    }

    return items.length > 0 ? items : BLOG_POSTS;
  } catch (err) {
    console.warn("Failed fetching live blog feed, falling back to static posts:", err);
    return BLOG_POSTS;
  }
}
