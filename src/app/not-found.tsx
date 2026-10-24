"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-2">
        <p className="text-sm font-mono text-on-surface-variant">Redirecting to ugandhar.in...</p>
      </div>
    </div>
  );
}
