import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.dataset.theme = 'light';
      root.classList.remove('dark');
    } else {
      root.dataset.theme = 'dark';
      root.classList.add('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Activate ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
      className="p-2 rounded-full border border-green-500/20 bg-[rgba(var(--bg-rgb),0.3)] text-green-500 hover:bg-[rgba(var(--bg-rgb),0.5)] focus:outline-none focus:ring-2 focus:ring-green-500/50"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Sun className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
}
