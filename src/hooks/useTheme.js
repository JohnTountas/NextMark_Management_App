import { useState, useEffect } from 'react';
import { loadTheme, saveTheme } from '../utils/storage';

export const useTheme = () => {
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return { theme, toggleTheme };
};
