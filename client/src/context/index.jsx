import React from "react";
import PropTypes from "prop-types";
import { applyTheme, DEFAULT_PALETTE_KEY } from "@/theme/colors";

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state, action) {
  switch (action.type) {
    // ---- existing ----
    case "OPEN_SIDENAV":
      return { ...state, openSidenav: action.value };
    case "SIDENAV_TYPE":
      return { ...state, sidenavType: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };

    // ---- new theme actions ----
    case "THEME_MODE": {
      const theme = { ...state.theme, mode: action.value };
      return { ...state, theme };
    }
    case "THEME_PALETTE": {
      const theme = { ...state.theme, paletteKey: action.value };
      return { ...state, theme };
    }
    case "THEME_CUSTOM": {
      const theme = { ...state.theme, custom: { ...state.theme.custom, ...action.value } };
      return { ...state, theme };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  // try to restore from localStorage:
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem("app_theme_state") || "{}");
    } catch (_) {
      return {};
    }
  })();

  const initialState = {
    openSidenav: false,
    sidenavColor: "white",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,

    // new theme state
    theme: {
      mode: saved.theme?.mode || "light",
      paletteKey: saved.theme?.paletteKey || DEFAULT_PALETTE_KEY,
      custom: saved.theme?.custom || {},
    },
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);

  // Apply CSS variables on mount & whenever theme changes
  React.useEffect(() => {
    applyTheme(controller.theme);

    // persist full state (not just theme)
    localStorage.setItem("app_theme_state", JSON.stringify(controller));
  }, [controller.theme]);

  const value = React.useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialTailwind.Provider value={value}>{children}</MaterialTailwind.Provider>;
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);
  if (!context) {
    throw new Error("useMaterialTailwindController must be used inside the provider");
  }
  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";
MaterialTailwindControllerProvider.propTypes = { children: PropTypes.node.isRequired };

// ---- existing setters ----
export const setOpenSidenav = (dispatch, value) => dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) => dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });

// ---- new setters ----
export const setThemeMode = (dispatch, value) => dispatch({ type: "THEME_MODE", value });
export const setThemePalette = (dispatch, value) => dispatch({ type: "THEME_PALETTE", value });
export const setThemeCustom = (dispatch, custom) => dispatch({ type: "THEME_CUSTOM", value: custom });


