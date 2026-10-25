import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { ResumeStatusCard } from "./ResumeStatusCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Career Status & Resume | Ugandhar Vaddi",
  description: "Career status update and technical background of Ugandhar Vaddi.",
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
