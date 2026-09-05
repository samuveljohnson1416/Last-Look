import { useState, useEffect } from 'react';

const THEME_KEY = 'dcp_sentinel_theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch {
      // ignore
    }
    // Default to 'light' (white background) per user requirement
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark', isLight: theme === 'light' };
}
