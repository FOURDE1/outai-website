import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { languages, type LanguageCode } from '@/i18n';
import type { Direction } from '@/types';

interface LanguageContextType {
  language: LanguageCode;
  direction: Direction;
  setLanguage: (lang: LanguageCode) => void;
  availableLanguages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation();

  const language = (i18n.language || 'en') as LanguageCode;
  const direction = languages[language]?.dir || 'ltr';

  const setLanguage = useCallback(
    (lang: LanguageCode) => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  // Apply direction to document
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        availableLanguages: languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { LanguageContext };
