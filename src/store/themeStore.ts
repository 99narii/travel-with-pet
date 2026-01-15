import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, ThemeState } from '../types';

const THEME_STORAGE_KEY = 'with-pet-trip-theme';

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getSystemTheme(),
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          return { theme: newTheme };
        });
      },
    }),
    {
      name: THEME_STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme);
        }
      },
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      document.documentElement.setAttribute('data-theme', parsed.state?.theme || 'light');
    } catch {
      document.documentElement.setAttribute('data-theme', getSystemTheme());
    }
  } else {
    document.documentElement.setAttribute('data-theme', getSystemTheme());
  }
}
