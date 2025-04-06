
import { ReactNode } from 'react';
import { Language } from './translations';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export interface LanguageProviderProps {
  children: ReactNode;
}
