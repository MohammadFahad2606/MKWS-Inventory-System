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
  };
  
  export const DARK_TOKENS = {
    text: "#e2e8f0",
    surface: "#0b1220",
    background: "#0b1220",
    muted: "#94a3b8",
    textOnPrimary: "#ffffff",
  };
  
  export const DEFAULT_PALETTE_KEY = "blue";
  
  // ---- Helper: apply CSS variables to <html> (documentElement) ----
  export function applyTheme({ paletteKey = DEFAULT_PALETTE_KEY, mode = "light", custom = {} }) {
    const p = PALETTES[paletteKey] || PALETTES[DEFAULT_PALETTE_KEY];
  
    const tokens = {
      ...p,
      ...(mode === "dark" ? DARK_TOKENS : {}),
      ...custom, // { iconColor?, text?, shadowColor?, ... }
    };
  
    const root = document.documentElement;
  
    root.style.setProperty("--color-primary", tokens.primary);
    root.style.setProperty("--color-primary-hover", tokens.primaryHover);
    root.style.setProperty("--color-accent", tokens.accent);
  
    root.style.setProperty("--color-text", tokens.text);
    root.style.setProperty("--color-text-on-primary", tokens.textOnPrimary);
    root.style.setProperty("--color-muted", tokens.muted);
  
    root.style.setProperty("--color-surface", tokens.surface);
    root.style.setProperty("--color-bg", tokens.background);
  
    root.style.setProperty("--color-icon", tokens.iconColor || tokens.text);
    root.style.setProperty("--shadow-color", tokens.shadowColor);
  
    // common shadow values (you can tweak via custom.shadowX if needed)
    root.style.setProperty("--shadow-elev-1", `0 8px 20px var(--shadow-color)`);
    root.style.setProperty("--shadow-elev-2", `0 14px 32px var(--shadow-color)`);
  
    // data-theme attribute (optional, for future styling)
    root.setAttribute("data-theme", mode);
  }
  