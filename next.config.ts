import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github-readme-stats.vercel.app",
      },
      {
        protocol: "https",
        hostname: "streak-stats.demolab.com",
      },
    ],
  },
};

export default nextConfig;
