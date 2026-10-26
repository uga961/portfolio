import { NextResponse } from "next/server";
import { getLiveBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getLiveBlogPosts();
  return NextResponse.json(posts);
}
