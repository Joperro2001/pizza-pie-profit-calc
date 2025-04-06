
import { Language, TranslationObject } from './translationTypes';
import { generalTranslations } from './general';
import { ingredientTranslations } from './ingredients';
import { pricingTranslations } from './pricing';
import { electricityTranslations } from './electricity';
import { howItWorksTranslations } from './howItWorks';
import { businessTranslations } from './business';

// Combine all translation objects into one
export const translations: TranslationObject = {
  ...generalTranslations,
  ...ingredientTranslations,
  ...pricingTranslations,
  ...electricityTranslations,
  ...howItWorksTranslations,
  ...businessTranslations,
};

export type { Language, TranslationObject as Translations };
