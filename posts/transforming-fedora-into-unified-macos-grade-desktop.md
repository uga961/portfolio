---
title: "Transforming Fedora into a Unified, macOS-Grade Desktop: The Complete Engineering Guide"
slug: "transforming-fedora-into-unified-macos-grade-desktop"
date: "2026-11-02"
lastUpdated: ""
excerpt: "An in-depth engineering deep dive into styling GNOME Shell 50 on Fedora, reverse engineering Electron app controls, harmonizing GTK 3/4 traffic lights, and achieving seamless compositor-level UI consistency."
tags: ["Linux", "Fedora", "GNOME", "Customization", "UI/UX", "Open Source", "Wayland"]
coverImage: "https://i.imgur.com/VVLfk5d.png"
author: "Ugandhar"
published: true
---

Fedora Linux with GNOME is widely regarded as one of the purest, most stable Linux workstation platforms available. Under the hood, modern Fedora pairs upstream Linux kernels with a rock-solid pure Wayland compositor and cutting-edge PipeWire audio. Yet, despite its technical excellence, anyone attempting to craft a deeply polished, unified desktop interface on Linux inevitably collides with the "patchwork UI" problem.

Out of the box, different applications render using entirely disparate window decoration paradigms. Modern GNOME core apps use GTK 4 and Libadwaita. Legacy utilities rely on GTK 3 or Qt. Browsers like Firefox maintain their own client-side decoration (CSD) pipelines. Electron-based IDEs—such as VS Code and Antigravity—either render generic titlebars or omit window controls entirely under Wayland. Meanwhile, the Mutter compositor unredirects fullscreen surfaces for gaming performance, inadvertently stripping window shaders and snapping rounded corners back into harsh 90-degree rectangles whenever top panels autohide.

![The completed Sunset desktop running on Fedora with custom floating controls and acrylic blur](https://i.imgur.com/E9zuOoy.png)

> "True desktop polish isn't achieved by swapping an icon pack or applying a wallpaper; it is achieved when every single window, titlebar, popover, and compositor shader obeys the exact same design language."

Over the past few weeks, I set out to bridge this divide completely. My objective was to transform my Fedora workstation into a cohesive, macOS-grade environment built around a bespoke **Sunset Aesthetic (Orchis-Purple-Dark)**. In this engineering guide, I document the technical journey: from CSS injection and GNOME Shell 50 internals to reverse engineering Electron `app.asar` bundles and overriding Mutter compositor direct scanout.

---

## 1. System Architecture & The Sunset Color Matrix

Before diving into low-level code, establishing a unified design token system was essential. When styling across multiple independent toolkits, having hardcoded ad-hoc hex values leads to visual clutter.

### Architectural Overview

| Component | Upstream Technology | Customization Layer | Role in Desktop Pipeline |
| :--- | :--- | :--- | :--- |
| **OS & Core** | Fedora Workstation (Rawhide / Wayland) | Kernel DRM/KMS | Direct display buffer management |
| **Compositor & Shell** | GNOME Shell 50 / Mutter | `gnome-shell.css` + Extensions | Clutter scene graph, panel, dock, and overlays |
| **Native Toolkits** | GTK 4 (Libadwaita) & GTK 3 | `~/.config/gtk-4.0/` & `gtk-3.0/` | System settings, file managers, system utilities |
| **Web Browser** | Firefox Quantum (Gecko CSD) | `chrome/userChrome.css` | Tab strip & custom titlebar window controls |
| **Development IDEs** | VS Code & Antigravity (Electron x64) | `app.asar` Preload + `workbench.css` | Frameless window controls & IPC injection |
| **Boot Experience** | GRUB 2 + Plymouth | ImageMagick Gaussian Shader | Pre-boot gradient and blur stage |

### The Sunset Palette

The visual identity pairs rich deep obsidian backgrounds with vibrant amethyst and sunset accents, grounded by authentic macOS traffic lights:

```css
:root {
  /* Surface Layers */
  --surface-canvas:      #0f0a19;
  --surface-acrylic:     rgba(22, 18, 30, 0.78);
  --surface-border:      rgba(255, 255, 255, 0.08);

  /* Sunset Brand Accents */
  --accent-primary:      #9d4edd;
  --accent-glow:         #a855f7;
  --accent-deep:         #7b2cbf;

  /* Traffic Light Window Controls */
  --traffic-close:       #fd5f51; /* Mac Coral Red */
  --traffic-minimize:    #fdbe04; /* Mac Amber Yellow */
  --traffic-maximize:    #38c76a; /* Mac Emerald Green */
  --traffic-border:      rgba(0, 0, 0, 0.15);
}
```

---

## 2. Harmonizing Window Controls Across 4 Toolkits

On macOS, window controls are universally recognized: three 13px circles (Red, Amber, Green) anchored cleanly in the top-left or top-right, showing micro-icons only on cursor hover. On Linux, achieving this requires synchronizing four separate rendering engines.

![macOS-style traffic light window controls with contextual hover glyphs](https://i.imgur.com/N2D1G9q.png)

### Toolkit 1: GTK 3 and GTK 4 / Libadwaita

Modern Libadwaita applications use HeaderBars, whereas GTK 3 applications use `.titlebar`. To enforce uniform traffic lights without breaking custom application headers, we inject universal rules in both `~/.config/gtk-3.0/gtk.css` and `~/.config/gtk-4.0/gtk.css`:

```css
/* Universal Traffic Light Button Sizing */
headerbar windowcontrols button,
.titlebar button.titlebutton {
  min-width: 13px !important;
  min-height: 13px !important;
  max-width: 13px !important;
  max-height: 13px !important;
  border-radius: 9999px !important;
  margin: 0 4px !important;
  padding: 0 !important;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: 8px 8px !important;
  -gtk-icon-shadow: none !important;
}

/* Base Colors (Resting State) */
headerbar windowcontrols button.close,
.titlebar button.titlebutton.close {
  background-color: #fd5f51 !important;
  color: transparent !important;
}

headerbar windowcontrols button.minimize,
.titlebar button.titlebutton.minimize {
  background-color: #fdbe04 !important;
  color: transparent !important;
}

headerbar windowcontrols button.maximize,
.titlebar button.titlebutton.maximize {
  background-color: #38c76a !important;
  color: transparent !important;
}

/* Hover State: Reveal Contextual Action Glyphs */
headerbar windowcontrols button.close:hover,
.titlebar button.titlebutton.close:hover {
  background-color: #e0443e !important;
  color: rgba(50, 0, 0, 0.7) !important;
}

headerbar windowcontrols button.minimize:hover,
.titlebar button.titlebutton.minimize:hover {
  background-color: #df9f1a !important;
  color: rgba(60, 40, 0, 0.7) !important;
}

headerbar windowcontrols button.maximize:hover,
.titlebar button.titlebutton.maximize:hover {
  background-color: #27aa35 !important;
  color: rgba(0, 40, 10, 0.7) !important;
}
```

![GSConnect settings window showing native GTK traffic lights and sunset backdrop](https://i.imgur.com/0i97NGe.png)

### Toolkit 2: Firefox CSD & The Infamous 4-Button Glitch

Firefox Quantum utilizes internal XUL CSD. When theming Firefox window controls via `userChrome.css`, a notorious bug frequently emerges: **Firefox shows four buttons instead of three**. 

This occurs because Firefox includes both a `.titlebar-max` button and a `.titlebar-restore` button in the DOM. Under certain GTK themes, both elements render simultaneously. To fix this, we implement strict `sizemode` state matching:

```css
/* ~/.mozilla/firefox/*.default-release/chrome/userChrome.css */

/* Hide redundant restore/max buttons based on window state */
:root[sizemode="maximized"] .titlebar-max {
  display: none !important;
}
:root[sizemode="normal"] .titlebar-restore {
  display: none !important;
}

/* Shape traffic lights */
.titlebar-button {
  width: 13px !important;
  height: 13px !important;
  margin: 0 4px !important;
  border-radius: 9999px !important;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  transition: all 0.15s ease-in-out !important;
}

.titlebar-close {
  background-color: #fd5f51 !important;
}
.titlebar-min {
  background-color: #fdbe04 !important;
}
.titlebar-max,
.titlebar-restore {
  background-color: #38c76a !important;
}
```

### Toolkit 3: VS Code Titlebar & Integrity Checksum Patching

In VS Code, custom titlebars are enabled by setting `"window.titleBarStyle": "custom"` in `settings.json`. However, styling `.codicon-chrome-close`, `.codicon-chrome-minimize`, and `.codicon-chrome-maximize` directly inside `/usr/lib64/code/resources/app/out/vs/workbench/workbench.desktop.main.css` triggers VS Code's self-integrity verification:

> *"[Unsupported] Your Code installation is corrupt. Please reinstall."*

To achieve a seamless custom titlebar while keeping VS Code completely clean, we automate recalculating the SHA-256 hash inside `product.json`:

```bash
CSS_FILE="/usr/lib64/code/resources/app/out/vs/workbench/workbench.desktop.main.css"
PRODUCT_JSON="/usr/lib64/code/resources/app/product.json"

# Compute the new base64 SHA-256 checksum
NEW_HASH=$(sha256sum "$CSS_FILE" | cut -d' ' -f1 | xxd -r -p | base64)

# Patch the checksum entry in product.json
sudo python3 -c "
import json
with open('$PRODUCT_JSON', 'r') as f:
    data = json.load(f)
data['checksums']['vs/workbench/workbench.desktop.main.css'] = '$NEW_HASH'
with open('$PRODUCT_JSON', 'w') as f:
    json.dump(data, f, indent=2)
"
```

After updating `product.json`, VS Code accepts the custom stylesheet as authentic without any corruption warnings.

---

## 3. Reverse Engineering Electron: Injected Traffic Lights in Antigravity IDE

Perhaps the most complex challenge during this workstation build was dealing with frameless Electron applications. 

The Antigravity IDE runs on Electron x64 (`~/.local/opt/Antigravity-x64/`). Because Wayland does not provide server-side window decorations for client-side frameless apps (`titleBarStyle: 'hidden'`), the application rendered without any exit, minimize, or maximize buttons at all. You were forced to rely on keyboard shortcuts (`Super+Q`, `Alt+F10`) to control the window.

![Antigravity IDE running seamlessly with injected native traffic lights](https://i.imgur.com/DDEykEl.png)

Rather than accepting this limitation, we cracked open Electron's internal package format.

### Step 1: Unpacking the ASAR Bundle

Electron archives its entire frontend and main thread JavaScript inside a single archive: `resources/app.asar`. Using the `asar` CLI:

```bash
cd ~/.local/opt/Antigravity-x64/resources
npx asar extract app.asar app-decompiled
```

Inspecting `app-decompiled/dist/` revealed two critical files:
1. `dist/main.js`: Electron's main process, registering standard IPC handlers: `window:minimize`, `window:maximize`, `window:close`.
2. `dist/preload.js`: The context bridge injected into every DOM window prior to page load.

### Step 2: Crafting the DOM Injection Script

Because the renderer process is sandboxed, we hooked directly into `dist/preload.js`. We designed a clean, collision-free ES6 IIFE that constructs an isolated DOM node tree, binds directly to Electron's IPC channel, and mounts onto `document.body` as soon as the DOM enters `interactive` or `complete` states:

```javascript
/* Injected into dist/preload.js */
(function() {
  function injectTrafficLights() {
    if (document.getElementById('native-traffic-lights')) return;

    const container = document.createElement('div');
    container.id = 'native-traffic-lights';
    container.style.cssText = `
      position: fixed;
      top: 10px;
      right: 14px;
      display: flex;
      gap: 8px;
      z-index: 999999;
      -webkit-app-region: no-drag;
      align-items: center;
    `;

    const buttons = [
      { id: 'min', color: '#fdbe04', action: () => window.electron?.ipcRenderer?.send('window:minimize') },
      { id: 'max', color: '#38c76a', action: () => window.electron?.ipcRenderer?.send('window:maximize') },
      { id: 'close', color: '#fd5f51', action: () => window.electron?.ipcRenderer?.send('window:close') }
    ];

    buttons.forEach(btn => {
      const el = document.createElement('button');
      el.style.cssText = `
        width: 13px;
        height: 13px;
        border-radius: 9999px;
        background: ${btn.color};
        border: 1px solid rgba(0, 0, 0, 0.15);
        cursor: pointer;
        outline: none;
        padding: 0;
        transition: transform 0.1s ease, filter 0.15s ease;
      `;
      el.addEventListener('mouseenter', () => el.style.filter = 'brightness(1.15)');
      el.addEventListener('mouseleave', () => el.style.filter = 'none');
      el.addEventListener('click', btn.action);
      container.appendChild(el);
    });

    document.body.appendChild(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectTrafficLights);
  } else {
    injectTrafficLights();
  }
})();
```

### Step 3: Repacking and Atomic Deployment

Once validated, we repacked the directory back into an optimized binary archive:

```bash
npx asar pack app-decompiled app.asar
```

Upon launching Antigravity IDE, our injected traffic lights mounted at the top-right corner. Clicking the amber button minimized the window via Electron IPC; clicking the red button sent a graceful exit signal. We had achieved native macOS controls inside a frameless Electron application on Wayland without touching upstream source repositories.

---

## 4. The Compositor Battle: Mutter Direct Scanout & Continuous Rounded Corners

One of the most frustrating bugs in Linux desktop theming involves window border radiuses. Using popular extensions like `rounded-window-corners-reborn`, windows look gorgeous when floating. 

However, as soon as a window is maximized, or when the top panel auto-hides via the `hidetopbar` extension, **the window corners abruptly snap into razor-sharp square edges**.

### The Root Cause: Mutter Unredirection

In GNOME's Mutter compositor, an optimization known as **Direct Scanout** (unredirection) bypasses compositor composition for fullscreen windows. When a single surface covers the entire monitor and no other transparent UI overlay exists:
1. Mutter detaches the Clutter scene graph.
2. The Wayland client buffer is passed directly to the KMS/DRM display controller.
3. Because Clutter GLSL fragment shaders are bypassed, any GLSL corner-rounding shader is discarded!

### The Fix: Disabling Compositor Unredirect

To maintain rounded corners continuously—even when windows span the full display or when top panels hide—we forced Mutter to keep compositor shaders active at all times.

Inside the extension initialization (`extension.js`), we hooked into the global compositor instance:

```javascript
// Force Mutter to keep Clutter fragment shaders active on all surfaces
if (global.compositor && global.compositor.disable_unredirect) {
  global.compositor.disable_unredirect();
}
```

Next, we synchronized `org.gnome.shell.extensions.hidetopbar`:

```bash
gsettings set org.gnome.shell.extensions.hidetopbar keep-round-corners true
```

With compositor unredirection suppressed, Mutter evaluates GLSL clipping shaders continuously across all window states. Windows now retain a smooth `14px` border radius across floating, tiled, and panel-hidden modes.

---

## 5. Polishing GNOME Shell 50: Micro-Interactions & Alignment

The difference between amateur theming and an operating system that feels truly polished comes down to micro-interactions and pixel alignment. GNOME Shell 50 introduced a redesigned Quick Settings layout, but its default CSS rules harbor several layout defects when combined with custom themes.

### The Quick Settings Battery Alignment Math

In GNOME 50, the Quick Settings action bar features circular 40px action buttons: Screenshot, Settings, Lock, and Power. The Battery indicator, however, uses an independent `.power-item` container. Upstream CSS assigned it `margin: 6px 12px; icon-size: 16px;`, causing the battery to render off-center and squished.

![Quick settings panel with not centered battery icon and purple accent sliders](https://i.imgur.com/FDpSVsP.png)

To solve this, we applied strict geometric math:

$$\text{Button Container} = 40\text{px}$$
$$\text{Icon Size} = 18\text{px}$$
$$\text{Remaining Margin Space} = 40\text{px} - 18\text{px} = 22\text{px}$$
$$\text{Even Margin (Top, Bottom, Left, Right)} = \frac{22\text{px}}{2} = 11\text{px}$$

We applied this directly in `~/.local/share/themes/Orchis-Purple-Dark/gnome-shell/gnome-shell.css`:

```css
/* Quick Settings Action Row: Exact 40px Geometric Centering */
.quick-settings-system-item .power-item {
  width: 18px !important;
  height: 18px !important;
  margin: 11px !important;
  padding: 0 !important;
  icon-size: 18px !important;
}

.quick-settings-system-item {
  min-width: 40px !important;
  min-height: 40px !important;
  border-radius: 9999px !important;
}
```

### Dock "All Apps" Boundary Bleed

When using `dash-to-dock` with pill-shaped floating styling, clicking the "Show Applications" grid icon caused square hover highlights to bleed outside the rounded container edges:

![Floating pill dock with glowing active indicators and rounded boundary](https://i.imgur.com/lGhdj1B.png)

```css
/* Dash to Dock: Contain Show-Apps Highlight within the Curved Pill */
#dash .show-apps .overview-icon {
  border-radius: 9999px !important;
  margin: 2px !important;
  padding: 4px !important;
}

#dash .show-apps:hover .overview-icon {
  background-color: rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.35) !important;
}
```

### The Lightbox Veil: Soft Amethyst Dimming

When GNOME Shell opens modal confirmation dialogs (e.g., Log Out, Restart, Root Authentication), Mutter's default `Lightbox` dims the background with an aggressive, opaque black mask (`fadeFactor: 0.8`), which obscures desktop context and feels visually jarring.

![Quick settings power menu with high-contrast text and dark glass blur](https://i.imgur.com/6Dw1fPa.png)

We patched the Lightbox actor in `rounded-windows` and styled the shell class:

```javascript
// Override Lightbox constructor parameters
Lightbox._init = function(container, params) {
  params = Object.assign({
    fadeFactor: 0.25,        // Reduced from 0.8 to 0.25
    radialEffect: false,     // Eliminates harsh vignette rings
  }, params);
  // ...
};
```

```css
/* Soft Amethyst Glass Veil */
.lightbox {
  background-color: rgba(15, 10, 25, 0.32) !important;
  backdrop-filter: blur(12px) !important;
}
```

Instead of pitching the display into pitch blackness, modal dialogs now hover over a luminous, softly blurred backdrop.

![Expanded Quick Settings control panel with refined sliders and active toggles](https://i.imgur.com/Cep88fY.png)

---

## 6. The Boot Stage: GRUB & Plymouth Sunset Blur

Desktop continuity should begin the second the machine boots. By default, raw 4K wallpapers in the GRUB boot menu make white font selections impossible to read due to high-frequency image details.

We created an automated ImageMagick pipeline that produces an ultra-smooth Gaussian-blurred boot canvas:

```bash
#!/usr/bin/env bash
INPUT="/home/uga961/Pictures/sunset-raw.png"
OUTPUT="/boot/grub2/themes/sunset/background.png"

# Apply a 0x18 Gaussian blur and composite a 35% dark obsidian overlay
magick "$INPUT" \
  -resize 1920x1080^ \
  -gravity center \
  -extent 1920x1080 \
  -gaussian-blur 0x18 \
  \( +clone -fill "#0f0a19" -colorize 35% \) \
  -composite "$OUTPUT"
```

The blurred background ensures GRUB's font stays crisp and readable, transitioning into the Plymouth bootsplash and GDM login screen with zero visual pop-in.

---

## 7. Master Configuration Cheat Sheet

Here is a quick summary mapping the visual features to their respective system configuration files:

| Feature / Goal | Target Config File | Implementation Mechanism |
| :--- | :--- | :--- |
| **GTK 3/4 Traffic Lights** | `~/.config/gtk-3.0/gtk.css`<br>`~/.config/gtk-4.0/gtk.css` | 13px circular border radius, Mac color hexes, hover SVG icon injection |
| **Firefox CSD 3-Button** | `~/.mozilla/firefox/*.default/chrome/userChrome.css` | `:root[sizemode]` rules suppressing duplicate restore button |
| **VS Code Traffic Lights** | `/usr/lib64/code/.../workbench.desktop.main.css` | Titlebar button styling + automated SHA-256 patch in `product.json` |
| **Electron Injected Controls** | `~/.local/opt/Antigravity-x64/resources/app.asar` | Extract ASAR, inject DOM traffic lights into `preload.js`, repack ASAR |
| **Continuous Rounded Corners** | Extension `rounded-windows` / Mutter | `global.compositor.disable_unredirect()` to preserve Clutter GLSL shaders |
| **Battery Icon Centering** | `.../gnome-shell/gnome-shell.css` | Geometric centering: 40px container, 18px icon, 11px padding |
| **Soft Glass Modal Dimming** | Extension `Lightbox` + `gnome-shell.css` | `fadeFactor: 0.25`, `rgba(15, 10, 25, 0.32)` Amethyst veil |
| **GRUB Boot Readability** | `/boot/grub2/themes/sunset/background.png` | ImageMagick Gaussian blur `0x18` + 35% `#0f0a19` overlay |

---

## Conclusion: Engineering Beyond Superficial Theming

The perception that Linux desktop environments cannot match the cohesive elegance of macOS is fundamentally incorrect. The difference is simply that macOS enforces design standards through a monolithic, proprietary vertical stack, whereas Linux grants you full architectural autonomy across distinct toolkits.

By treating the desktop not as a collection of disjointed apps, but as a unified software engineering system—inspecting Wayland compositor behaviors, extracting and patching Electron bundles, harmonizing GTK and Gecko stylesheets, and computing micro-interaction geometry—you can achieve an operating environment that is visually stunning, functionally coherent, and uniquely your own.

If you are running Fedora or GNOME 50, take a look at your window controls and compositor shaders today. With a bit of low-level curiosity, you can turn your Linux desktop into an absolute work of art.
