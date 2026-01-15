import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale, LocaleState } from '../types';

const LOCALE_STORAGE_KEY = 'with-pet-trip-locale';

const getBrowserLocale = (): Locale => {
  if (typeof window === 'undefined') return 'ko';
  const lang = navigator.language.toLowerCase();
  return lang.startsWith('ko') ? 'ko' : 'en';
};

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: getBrowserLocale(),
      setLocale: (locale) => {
        document.documentElement.setAttribute('lang', locale);
        set({ locale });
      },
      toggleLocale: () => {
        set((state) => {
          const newLocale = state.locale === 'ko' ? 'en' : 'ko';
          document.documentElement.setAttribute('lang', newLocale);
          return { locale: newLocale };
        });
      },
    }),
    {
      name: LOCALE_STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute('lang', state.locale);
        }
      },
    }
  )
);

// Initialize locale on load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      document.documentElement.setAttribute('lang', parsed.state?.locale || 'ko');
    } catch {
      document.documentElement.setAttribute('lang', getBrowserLocale());
    }
  } else {
    document.documentElement.setAttribute('lang', getBrowserLocale());
  }
}
