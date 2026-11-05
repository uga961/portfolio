#!/usr/bin/env node

/**
 * Submits portfolio and blog URLs to IndexNow (Bing, Microsoft Copilot, and Yandex).
 * Protocol spec: https://www.indexnow.org/
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const HOST = "www.ugandhar.in";
const KEY = "2f8745c1a89b4f99a071de8463990b76";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function getPostUrls() {
  const postsDir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir);
  const urls = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    try {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(content);
      if (data.published === false) continue;

      const slug = data.slug ? generateSlug(String(data.slug)) : file.replace(/\.md$/, "");
      urls.push(`https://${HOST}/blog/posts/${slug}`);
    } catch (e) {
      console.warn(`Error reading post ${file}:`, e.message);
    }
  }

  return urls;
}

const staticUrls = [
  `https://${HOST}`,
  `https://${HOST}/blog`,
  `https://${HOST}/resume`,
];

const postUrls = getPostUrls();
const URLs = [...staticUrls, ...postUrls];

async function submitIndexNow() {
  console.log(`Submitting ${URLs.length} URLs to IndexNow for Bing and Microsoft Copilot...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLs,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow response status: ${res.status} ${res.statusText}`);
    if (res.ok || res.status === 200 || res.status === 202) {
      console.log("✓ Successfully notified Bing and Microsoft Copilot!");
      console.log("Submitted URLs:");
      URLs.forEach((u) => console.log(`  - ${u}`));
    } else {
      console.warn("IndexNow returned non-200 status:", await res.text());
    }
  } catch (err) {
    console.error("IndexNow submission failed:", err);
  }
}

submitIndexNow();
