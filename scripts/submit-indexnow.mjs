#!/usr/bin/env node

/**
 * Submits portfolio URLs to IndexNow (Bing, Microsoft Copilot, and Yandex).
 * Protocol spec: https://www.indexnow.org/
 */

const HOST = "www.ugandhar.in";
const KEY = "2f8745c1a89b4f99a071de8463990b76";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLs = [
  `https://${HOST}`,
  `https://${HOST}/resume`,
];

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
