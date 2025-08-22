// main.jsx / index.jsx

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import store from "./redux/store";
import { Provider } from "react-redux";

// colors.js se import
import { applyTheme, DEFAULT_PALETTE_KEY } from "@/theme/colors";

// Wrapper component jo load hote hi theme apply karega
function ThemeInitializer({ children }) {
  useEffect(() => {
    // yahan se default theme apply hogi (blue for example)
    applyTheme({ paletteKey: DEFAULT_PALETTE_KEY, mode: "light" });
  }, []);

  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <ThemeInitializer>
              <App />
            </ThemeInitializer>
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
);
