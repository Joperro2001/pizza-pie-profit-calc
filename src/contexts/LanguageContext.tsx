
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'it';

type Translations = {
  [key: string]: {
    en: string;
    it: string;
  };
};

// Add translations for all the text in the application
const translations: Translations = {
  // Header and general
  appTitle: {
    en: 'Pizza Profit Calculator',
    it: 'Calcolatore Profitto Pizza'
  },
  appSubtitle: {
    en: 'Calculate your authentic pizza selling price based on ingredient costs and maximize your profit margin',
    it: 'Calcola il prezzo di vendita della tua autentica pizza in base ai costi degli ingredienti e massimizza il tuo margine di profitto'
  },
  language: {
    en: 'Language',
    it: 'Lingua'
  },
  
  // Ingredients section
  ingredients: {
    en: 'Ingredients',
    it: 'Ingredienti'
  },
  doughIngredients: {
    en: 'Dough Ingredients',
    it: 'Ingredienti per l\'Impasto'
  },
  condiments: {
    en: 'Condiments',
    it: 'Condimenti'
  },
  flour: {
    en: 'Flour',
    it: 'Farina'
  },
  water: {
    en: 'Water',
    it: 'Acqua'
  },
  yeast: {
    en: 'Yeast',
    it: 'Lievito'
  },
  salt: {
    en: 'Salt',
    it: 'Sale'
  },
  oliveOil: {
    en: 'Olive Oil',
    it: 'Olio d\'Oliva'
  },
  tomatoSauce: {
    en: 'Tomato Sauce',
    it: 'Salsa di Pomodoro'
  },
  mozzarella: {
    en: 'Mozzarella',
    it: 'Mozzarella'
  },
  mushrooms: {
    en: 'Mushrooms',
    it: 'Funghi'
  },
  anchovies: {
    en: 'Anchovies',
    it: 'Acciughe'
  },
  prosciutto: {
    en: 'Prosciutto',
    it: 'Prosciutto'
  },
  salame: {
    en: 'Salame',
    it: 'Salame'
  },
  zucchini: {
    en: 'Zucchini',
    it: 'Zucchine'
  },
  
  // Profit margin section
  profitMargin: {
    en: 'Profit Margin',
    it: 'Margine di Profitto'
  },
  profitMarginPercentage: {
    en: 'Profit Margin (%)',
    it: 'Margine di Profitto (%)'
  },
  lowerMargins: {
    en: 'Lower margins: More competitive pricing',
    it: 'Margini più bassi: Prezzi più competitivi'
  },
  higherMargins: {
    en: 'Higher margins: Better profit per pizza',
    it: 'Margini più alti: Maggior profitto per pizza'
  },
  
  // Price calculation
  pizzaPriceCalculation: {
    en: 'Pizza Price Calculation',
    it: 'Calcolo Prezzo Pizza'
  },
  costFor6Pizzas: {
    en: 'Cost for 6 Pizzas',
    it: 'Costo per 6 Pizze'
  },
  costPerPizza: {
    en: 'Cost per Pizza',
    it: 'Costo per Pizza'
  },
  profitPerPizza: {
    en: 'Profit per Pizza',
    it: 'Profitto per Pizza'
  },
  recommendedSellingPrice: {
    en: 'Recommended Selling Price',
    it: 'Prezzo di Vendita Consigliato'
  },
  
  // How it works
  howItWorks: {
    en: 'How it works:',
    it: 'Come funziona:'
  },
  step1: {
    en: 'Enter the cost per unit for each ingredient',
    it: 'Inserisci il costo per unità di ogni ingrediente'
  },
  step2: {
    en: 'Set cost to 0 for ingredients you\'re not using',
    it: 'Imposta il costo a 0 per gli ingredienti che non usi'
  },
  step3: {
    en: 'The calculator uses a standard recipe for 6 pizzas',
    it: 'Il calcolatore usa una ricetta standard per 6 pizze'
  },
  step4: {
    en: 'Adjust the profit margin using the slider',
    it: 'Regola il margine di profitto usando il cursore'
  },
  step5: {
    en: 'See your recommended selling price!',
    it: 'Vedi il tuo prezzo di vendita consigliato!'
  },
  quote: {
    en: 'The secret to success is not the sauce, it\'s the profit margin!',
    it: 'Il segreto del successo non è la salsa, è il margine di profitto!'
  },
  
  // Footer
  copyright: {
    en: 'Making pizza profitable, one slice at a time',
    it: 'Rendere la pizza redditizia, una fetta alla volta'
  },
  forSixPizzas: {
    en: 'For 6 pizzas:',
    it: 'Per 6 pizze:'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
