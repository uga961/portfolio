import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { ResumeStatusCard } from "./ResumeStatusCard";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Career Status & Technical Background | Ugandhar Vaddi",
  description:
    "Career status update, engineering background, and professional profile of Ugandhar Vaddi, Associate Data Scientist at Tredence.",
  keywords: [
    "Ugandhar Vaddi resume",
    "Ugandhar Vaddi CV",
    "Ugandhar Vaddi career",
    "Ugandhar Vaddi Tredence",
    "Ugandhar Vaddi Data Scientist",
  ],
  alternates: {
    canonical: "https://www.ugandhar.in/resume",
  },
  openGraph: {
    title: "Career Status & Technical Background | Ugandhar Vaddi",
    description:
      "Career status update, engineering background, and professional profile of Ugandhar Vaddi, Associate Data Scientist at Tredence.",
    url: "https://www.ugandhar.in/resume",
    siteName: "Ugandhar Vaddi",
    type: "profile",
  },
};

export default function ResumePage() {
  const resumeDir = path.join(process.cwd(), "public", "resume");

  if (fs.existsSync(resumeDir)) {
    try {
      const files = fs
        .readdirSync(resumeDir)
        .filter((file) => !file.startsWith(".") && file.toLowerCase().endsWith(".pdf"));

      if (files.length > 0) {
        // If a resume PDF exists in public/resume/, automatically redirect to it
        redirect(`/resume/${files[0]}`);
      }
    } catch (err: unknown) {
      // If error is a Next.js redirect, rethrow it so Next.js performs the redirect
      if (err && typeof err === "object" && "digest" in err) {
        throw err;
      }
    }
  }

  // If no resume PDF is present in public/resume/, show the polite status notice
  return <ResumeStatusCard />;
}
