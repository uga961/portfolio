"use client";

import React, { useState } from "react";
import { MagneticDock } from "./MagneticDock";
import { CommandPalette } from "./CommandPalette";

export function PortfolioNavShell() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <>
      <MagneticDock onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
