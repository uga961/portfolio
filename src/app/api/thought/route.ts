import { NextResponse } from "next/server";
import { getLiveThoughtPosts } from "@/lib/thought";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getLiveThoughtPosts();
  return NextResponse.json(posts);
}
