// src/theme/themeSwitcher.js
export const setTheme = (themeName) => {
    document.documentElement.setAttribute("data-theme", themeName);
  
    // Optional: update custom colors from your palette
    const themes = {
      green: {
        "--color-primary": "#395917",
        "--color-secondary": "#A4CBAE",
        "--color-bg-primary": "#121212",
        "--color-bg-secondary": "#201F23",
        "--color-text": "#FFFFFF",
      },
      orange: {
        "--color-primary": "#F97316",
        "--color-secondary": "#FDBA74",
        "--color-bg-primary": "#1A1A1A",
        "--color-bg-secondary": "#2A2A2A",
        "--color-text": "#FFFFFF",
      },
      blue: {
        "--color-primary": "#2563EB",
        "--color-secondary": "#93C5FD",
        "--color-bg-primary": "#0F172A",
        "--color-bg-secondary": "#1E293B",
        "--color-text": "#FFFFFF",
      },
    };
  
    const selected = themes[themeName] || themes.green;
    Object.keys(selected).forEach((key) => {
      document.documentElement.style.setProperty(key, selected[key]);
    });
  
    // Save to localStorage if you want to persist theme across reload
    localStorage.setItem("app_theme_state", JSON.stringify({ theme: { paletteKey: themeName } }));
  };
  