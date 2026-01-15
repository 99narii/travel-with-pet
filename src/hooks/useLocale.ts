import { useCallback } from 'react';
import { useLocaleStore } from '../store';
import koData from '../data/locales/ko.json';
import enData from '../data/locales/en.json';
import type { Locale, LocaleData } from '../types';

const locales: Record<Locale, LocaleData> = {
  ko: koData as LocaleData,
  en: enData as LocaleData,
};

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<LocaleData>;

export function useLocale() {
  const { locale, setLocale, toggleLocale } = useLocaleStore();

  const t = useCallback(
    (key: TranslationKey): string => {
      const keys = key.split('.');
      let value: unknown = locales[locale];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }

      return typeof value === 'string' ? value : key;
    },
    [locale]
  );

  const getLocalized = useCallback(
    <T extends { ko: string; en: string }>(obj: T): string => {
      return obj[locale];
    },
    [locale]
  );

  const data = locales[locale];

  return {
    locale,
    setLocale,
    toggleLocale,
    t,
    getLocalized,
    data,
  };
}
