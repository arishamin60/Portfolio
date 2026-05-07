/**
 * DarkModeToggle Component
 * Allows users to switch between light and dark themes
 * Persists preference in localStorage
 */

import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  if (!toggleTheme) {
    return null; // Theme switching not enabled
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-secondary transition-colors focus-ring"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-foreground" />
      ) : (
        <Sun className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
}
