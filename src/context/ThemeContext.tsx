// ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "custom";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from localStorage or default to light
    const savedTheme = localStorage.getItem("dashboard-theme") as Theme;
    return savedTheme || "light";
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dashboard-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
