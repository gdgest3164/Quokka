import { useState, useEffect } from "react";

export default function useDarkSide(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [theme, setTheme] = useState<string>(() => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      return localStorage.theme || "light";
    } else {
      // Fallback value if localStorage is not available
      return "light";
    }
  });

  const colorTheme: string = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root: HTMLElement = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
      if (localStorage.theme == "dark") localStorage.removeItem("theme");
      else localStorage.setItem("theme", theme);
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
