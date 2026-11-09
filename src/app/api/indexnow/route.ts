import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

const INDEXNOW_KEY = "2f8745c1a89b4f99a071de8463990b76";
const HOST = "www.ugandhar.in";

export async function GET() {
  const posts = getAllPosts(false);
  const postUrls = posts.map((p) => `https://${HOST}/blog/posts/${p.slug}`);

  const urlList = [
    `https://${HOST}`,
    `https://${HOST}/blog`,
    `https://${HOST}/resume`,
    ...postUrls,
  ];

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: response.ok || response.status === 200 || response.status === 202,
      status: response.status,
      statusText: response.statusText,
      host: HOST,
      submittedUrls: urlList.length,
      urls: urlList,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
