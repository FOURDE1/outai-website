import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';

export const languages = {
  en: { name: 'English', dir: 'ltr' as const, nativeName: 'English' },
  fr: { name: 'French', dir: 'ltr' as const, nativeName: 'Français' },
} as const;

export type LanguageCode = keyof typeof languages;

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: Object.keys(languages),
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'outai-language',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
