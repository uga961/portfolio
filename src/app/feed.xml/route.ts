import { NextResponse } from "next/server";
import { PERSONAL_INFO } from "@/data/portfolio";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = getAllPosts(false);
  const siteUrl = "https://www.ugandhar.in";

  const itemsXml = posts
    .slice(0, 50)
    .map((post) => {
      const postUrl = `${siteUrl}/blog/posts/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[${PERSONAL_INFO.name}]]></dc:creator>
      <author><![CDATA[${PERSONAL_INFO.email} (${PERSONAL_INFO.name})]]></author>
      <description><![CDATA[${post.excerpt || post.title}]]></description>
      ${post.tags.map((t) => `<category><![CDATA[${t}]]></category>`).join("\n      ")}
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title><![CDATA[${PERSONAL_INFO.name} — Technical Journal & Blog]]></title>
    <link>${siteUrl}/blog</link>
    <description><![CDATA[Long-form engineering essays, systems architectures, data manipulation workflows, and technical notes.]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/Logo.png</url>
      <title>${PERSONAL_INFO.name}</title>
      <link>${siteUrl}/blog</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
