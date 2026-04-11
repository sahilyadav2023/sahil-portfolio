import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// ─── ThemeProvider ────────────────────────────────────────────────────────────
// Wraps the entire app. Reads saved preference from localStorage on first load,
// defaults to 'light'. Toggling adds/removes class="dark" on <body>,
// which flips all CSS custom properties defined in index.css.

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — import this in any component to read/toggle theme
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
