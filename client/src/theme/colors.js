// src/theme/colors.js

// ---- Ready-made palettes (converted to HEX) ----
export const PALETTES = {
  appTheme: {
    name: 'appTheme',
    background: '#ffffff',          // White
    foreground: '#252525',          // Dark Charcoal
    card: '#ffffff',                // White
    cardForeground: '#252525',      // Dark Charcoal
    popover: '#ffffff',             // White
    popoverForeground: '#252525',   // Dark Charcoal

    primary: '#2f2f2f',             // Jet Black / Very Dark Gray
    primaryForeground: '#fbfbfb',   // Almost White

    secondary: '#f0f0f0',           // Light Gray
    secondaryForeground: '#2f2f2f', // Jet Black / Very Dark Gray

    muted: '#f7f7f7',               // Very Light Gray
    mutedForeground: '#7f7f7f',     // Medium Gray

    accent: '#e9b54b',              // Golden Yellow
    accentForeground: '#252525',    // Dark Charcoal

    destructive: '#d64d4d',         // Soft Red

    border: '#ebebeb',              // Light Gray
    input: '#ebebeb',               // Light Gray
    ring: '#b5b5b5',                // Medium Gray

    // charts
    chart1: '#d75a42',              // Orange-Red
    chart2: '#3c93d9',              // Sky Blue
    chart3: '#2f53d9',              // Royal Blue
    chart4: '#e9b54b',              // Golden Yellow
    chart5: '#e18a3a',              // Amber / Orange

    // sidebar
    sidebar: '#fbfbfb',             // Almost White
    sidebarForeground: '#252525',   // Dark Charcoal
    sidebarPrimary: '#2f2f2f',      // Jet Black / Very Dark Gray
    sidebarPrimaryForeground: '#fbfbfb', // Almost White
    sidebarAccent: '#f7f7f7',       // Very Light Gray
    sidebarAccentForeground: '#252525', // Dark Charcoal
    sidebarBorder: '#ebebeb',       // Light Gray
    sidebarRing: '#b5b5b5',         // Medium Gray
  },
};

// ---- Status Colors ----
export const STATUS_COLORS = {
  error: '#C92E4F',   // Crimson Red
  success: '#8AC14A', // Lime Green
  info: '#4683F2',    // Blue
  warning: '#FED363', // Mustard Yellow
};

// ---- Dark Mode Tokens ----
export const DARK_TOKENS = {
  background: '#0b1220',       // Very Dark Navy
  foreground: '#e2e8f0',       // Light Gray
  card: '#1a2235',             // Dark Slate Blue
  cardForeground: '#e2e8f0',   // Light Gray
  popover: '#1a2235',           // Dark Slate Blue
  popoverForeground: '#e2e8f0', // Light Gray

  muted: '#1e293b',             // Dark Slate
  mutedForeground: '#94a3b8',   // Slate Gray

  primary: '#3b82f6',           // Blue 500
  primaryForeground: '#ffffff',  // White
};

// Default palette
export const DEFAULT_PALETTE_KEY = 'appTheme';

// ---- Apply Theme ----
export function applyTheme({
  paletteKey = DEFAULT_PALETTE_KEY,
  mode = 'light',
  custom = {},
}) {
  const palette = PALETTES[paletteKey] || PALETTES[DEFAULT_PALETTE_KEY];

  const tokens = {
    ...palette,
    ...(mode === 'dark' ? DARK_TOKENS : {}),
    ...custom,
  };

  const root = document.documentElement;

  // Base & palette tokens
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Status colors
  Object.entries(STATUS_COLORS).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  root.setAttribute('data-theme', mode);
}
