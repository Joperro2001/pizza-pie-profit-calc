
export type Language = 'en' | 'it';

export type TranslationEntry = {
  en: string;
  it: string;
};

export type TranslationObject = {
  [key: string]: TranslationEntry;
};
