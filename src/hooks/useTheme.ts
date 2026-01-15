import { useThemeStore } from '../store';

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark,
    isLight,
  };
}
