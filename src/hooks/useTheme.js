import { useState, useEffect } from 'react';
import { loadTheme, saveTheme } from '../utils/storage';

// Legacy theme hook retained for reference. The current App shell manages theme
// directly, but this wrapper is still useful documentation for a reusable pattern.
export const useTheme = () => {
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    const root = document.documentElement;

    // Mirror the theme into the root class so utility styles can respond
    // without components needing to know about DOM details.
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return { theme, toggleTheme };
};
