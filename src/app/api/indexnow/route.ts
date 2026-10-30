import { NextResponse } from "next/server";

const INDEXNOW_KEY = "2f8745c1a89b4f99a071de8463990b76";
const HOST = "www.ugandhar.in";

const URL_LIST = [
  `https://${HOST}`,
  `https://${HOST}/resume`,
];

export async function GET() {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: URL_LIST,
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
      submittedUrls: URL_LIST.length,
      urls: URL_LIST,
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
