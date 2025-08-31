import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Switch, Typography } from "@material-tailwind/react";

import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavType,
  setFixedNavbar,
  setThemeMode,
  setThemePalette,
  setThemeCustom,
} from "@/context";

import { PALETTES } from "@/theme/colors";

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavType, fixedNavbar, theme } = controller;

  const paletteKeys = Object.keys(PALETTES);

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 
      bg-[var(--color-background)] text-[var(--color-foreground)] px-2.5 shadow-lg 
      transition-transform duration-300 
      ${openConfigurator ? "translate-x-0" : "translate-x-96"}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" className="text-[var(--color-foreground)]">
            App Configurator
          </Typography>
          <Typography className="font-normal text-[var(--color-mutedForeground)]">
            Customize theme across the app.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="py-4 px-6 space-y-10">

        {/* Theme Mode */}
        <div>
          <Typography variant="h6" className="text-[var(--color-text)]">
            Theme Mode
          </Typography>
          <div className="mt-3 flex items-center gap-3">
            <Button
              variant={theme.mode === "light" ? "gradient" : "outlined"}
              className="!from-[var(--color-primary)] !to-[var(--color-primary-hover)]"
              onClick={() => setThemeMode(dispatch, "light")}
            >
              Light
            </Button>
            <Button
              variant={theme.mode === "dark" ? "gradient" : "outlined"}
              className="!from-[var(--color-primary)] !to-[var(--color-primary-hover)]"
              onClick={() => setThemeMode(dispatch, "dark")}
            >
              Dark
            </Button>
          </div>
        </div>

        {/* Brand Palette */}
        <div>
          <Typography variant="h6" className="text-[var(--color-text)]">
            Brand Palette
          </Typography>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {paletteKeys.map((key) => {
              const p = PALETTES[key];
              return (
                <button
                  key={key}
                  className={`h-7 w-7 rounded-full border transition-transform hover:scale-105`}
                  style={{
                    background: p.primary,
                    borderColor: theme.paletteKey === key ? p.primaryHover : "transparent",
                  }}
                  title={p.name}
                  onClick={() => setThemePalette(dispatch, key)}
                />
              );
            })}
          </div>
        </div>

        {/* Fine Tuning */}
        <div>
          <Typography variant="h6" className="text-[var(--color-text)]">
            Fine Tuning
          </Typography>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {/* Icon Color */}
            <div className="flex flex-col gap-2">
              <Typography variant="small" className="text-[var(--color-mutedForeground)]">
                Icon
              </Typography>
              <input
                type="color"
                value={theme?.custom?.iconColor || getComputedStyle(document.documentElement).getPropertyValue("--color-icon").trim()}
                onChange={(e) => setThemeCustom(dispatch, { iconColor: e.target.value })}
                className="h-10 w-full rounded cursor-pointer border border-blue-gray-100"
              />
            </div>

            {/* Text Color */}
            <div className="flex flex-col gap-2">
              <Typography variant="small" className="text-[var(--color-mutedForeground)]">
                Text
              </Typography>
              <input
                type="color"
                value={theme?.custom?.text || getComputedStyle(document.documentElement).getPropertyValue("--color-text").trim()}
                onChange={(e) => setThemeCustom(dispatch, { text: e.target.value })}
                className="h-10 w-full rounded cursor-pointer border border-blue-gray-100"
              />
            </div>

            {/* Shadow Color */}
            <div className="flex flex-col gap-2">
              <Typography variant="small" className="text-[var(--color-mutedForeground)]">
                Shadow
              </Typography>
              <input
                type="color"
                value={theme?.custom?.shadowColor || "#000000"}
                onChange={(e) => setThemeCustom(dispatch, { shadowColor: hexToRgba(e.target.value, 0.35) })}
                className="h-10 w-full rounded cursor-pointer border border-blue-gray-100"
              />
            </div>
          </div>
          <Typography variant="small" className="text-[var(--color-mutedForeground)] mt-2">
            Tip: Shadow color uses 35% opacity automatically.
          </Typography>
        </div>

        {/* Sidenav Controls */}
        <div>
          <Typography variant="h6" className="text-[var(--color-text)]">
            Sidenav Type
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
              className="!from-[var(--color-primary)] !to-[var(--color-primary-hover)]"
              onClick={() => setSidenavType(dispatch, "dark")}
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
              className="!from-[var(--color-primary)] !to-[var(--color-primary-hover)]"
              onClick={() => setSidenavType(dispatch, "transparent")}
            >
              Transparent
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              className="!from-[var(--color-primary)] !to-[var(--color-primary-hover)]"
              onClick={() => setSidenavType(dispatch, "white")}
            >
              White
            </Button>
          </div>
        </div>

        {/* Navbar Fixed */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <Typography className="text-[var(--color-text)]">Navbar Fixed</Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

// helper: convert hex → rgba
function hexToRgba(hex, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";
export default Configurator;
