// src/theme/colors.js

// ---- Ready-made palettes (aap yahan mazeed add/update kar sakte ho) ----
export const PALETTES = {
  blue: {
    name: "Blue",
    primary: "#3b82f6",         // blue-500
    primaryHover: "#2563eb",    // blue-600
    accent: "#22c55e",          // green-500
    text: "#0f172a",            // slate-900
    textOnPrimary: "#ffffff",
    surface: "#ffffff",
    background: "#f8fafc",
    muted: "#64748b",           // slate-500
    shadowColor: "rgba(59,130,246,0.35)", // primary-tinted
  },
  emerald: {
    name: "Emerald",
    primary: "#10b981",
    primaryHover: "#059669",
    accent: "#3b82f6",
    text: "#0f172a",
    textOnPrimary: "#ffffff",
    surface: "#ffffff",
    background: "#f6fef9",
    muted: "#64748b",
    shadowColor: "rgba(16,185,129,0.35)",
  },
  violet: {
    name: "Violet",
    primary: "#8b5cf6",
    primaryHover: "#7c3aed",
    accent: "#f59e0b",
    text: "#0f172a",
    textOnPrimary: "#ffffff",
    surface: "#ffffff",
    background: "#faf5ff",
    muted: "#64748b",
    shadowColor: "rgba(139,92,246,0.35)",
  },
  orange: {
    name: "Orange",
    primary: "#f97316",
    primaryHover: "#ea580c",
    accent: "#06b6d4",
    text: "#0f172a",
    textOnPrimary: "#0b1220",
    surface: "#ffffff",
    background: "#fff7ed",
    muted: "#64748b",
    shadowColor: "rgba(249,115,22,0.35)",
  },
  pink: {
    name: "Pink",
    primary: "#ec4899",
    primaryHover: "#db2777",
    accent: "#22c55e",
    text: "#0f172a",
    textOnPrimary: "#ffffff",
    surface: "#ffffff",
    background: "#fdf2f8",
    muted: "#64748b",
    shadowColor: "rgba(236,72,153,0.35)",
  },
  gray: {   // ✅ Added Gray theme
    name: "Gray",
    primary: "#111827",        // gray-900
    primaryHover: "#1f2937",   // gray-800
    accent: "#6b7280",         // gray-500
    text: "#111827",            // gray-900
    textOnPrimary: "#ffffff",
    surface: "#f9fafb",        // gray-50
    background: "#f3f4f6",     // gray-100
    muted: "#6b7280",           // gray-500
    shadowColor: "rgba(17,24,39,0.35)", // gray-900 semi-transparent
  },
  mustard: {
    name: "Mustard",
    primary: "#FED363",        // mustard
    primaryHover: "#e6bd58",   // thoda dark hover version
    accent: "#54BA88",         // mint ko accent bana diya
    text: "#2C3E51",           // charcoal for text
    textOnPrimary: "#2C3D4F",  // charcoal-3 contrast par
    surface: "#FEFEFE",        // white for surface
    background: "#D1E8DE",     // honeydew for background
    muted: "#C8CCCF",          // silver for muted
    shadowColor: "rgba(254, 211, 99, 0.35)", // mustard ka transparent shadow
  },
  appTheme: {
    name: "appTheme",
    primary: "#FED363",        // mustard
    primaryHover: "#e6bd58",   // darker mustard hover
    text: "#2C3E51",           // charcoal for main text
    textOnPrimary: "#ffffff",  // white text on primary buttons
    surface: "#ffffff",     // main background
    secondaryBackground: "#999999", // secondary bg
    sidebarBackground: "#2C3E51",   // sidebar bg (charcoal)
    highlight: "#C6C4FA",      // highlight color (soft violet)
    muted: "#999999",          // neutral/silver
    shadowColor: "rgba(44,62,81,0.25)", // shadow with charcoal tint

    // Extras
    accent : "#54BA88",         // optional accent (mint)
  }

};


// ---- Status Colors (for alerts, buttons, messages) ----
export const STATUS_COLORS = {
  error: "#C92E4F",   // stock out, delete
  success: "#8AC14A", // stock in, increase
  info: "#4683F2",    // info
  warning: "#FED363", // mustard ko warning bana diya
}


export const DARK_TOKENS = {
  text: "#e2e8f0",
  surface: "#0b1220",
  background: "#0b1220",
  muted: "#94a3b8",
  textOnPrimary: "#ffffff",
};

export const DEFAULT_PALETTE_KEY = "mustard";

// ---- Helper: apply CSS variables to <html> (documentElement) ----
export function applyTheme({ paletteKey = DEFAULT_PALETTE_KEY, mode = "light", custom = {} }) {
  const p = PALETTES[paletteKey] || PALETTES[DEFAULT_PALETTE_KEY];

  const tokens = {
    ...p,
    ...(mode === "dark" ? DARK_TOKENS : {}),
    ...custom, // { iconColor?, text?, shadowColor?, ... }
  };

  const root = document.documentElement;
  // Palette-based tokens
  root.style.setProperty("--color-primary", tokens.primary);
  root.style.setProperty("--color-primary-hover", tokens.primaryHover);
  root.style.setProperty("--color-accent", tokens.accent);

  root.style.setProperty("--color-text", tokens.text);
  root.style.setProperty("--color-text-on-primary", tokens.textOnPrimary);
  root.style.setProperty("--color-muted", tokens.muted);

  root.style.setProperty("--color-surface", tokens.surface);
  root.style.setProperty("--color-bg", tokens.background);
  root.style.setProperty("--color-secondary-bg", tokens.secondaryBackground || tokens.background);
  root.style.setProperty("--color-sidebar-bg", tokens.sidebarBackground || tokens.background);
  root.style.setProperty("--color-highlight", tokens.highlight || tokens.accent);

  root.style.setProperty("--color-icon", tokens.iconColor || tokens.text);
  root.style.setProperty("--shadow-color", tokens.shadowColor);

  // Status tokens
  root.style.setProperty("--color-error", STATUS_COLORS.error);
  root.style.setProperty("--color-success", STATUS_COLORS.success);
  root.style.setProperty("--color-warning", STATUS_COLORS.warning);
  root.style.setProperty("--color-info", STATUS_COLORS.info);

  // common shadow values (you can tweak via custom.shadowX if needed)
  root.style.setProperty("--shadow-elev-1", `0 8px 20px var(--shadow-color)`);
  root.style.setProperty("--shadow-elev-2", `0 14px 32px var(--shadow-color)`);

  // data-theme attribute (optional, for future styling)
  root.setAttribute("data-theme", mode);
}
