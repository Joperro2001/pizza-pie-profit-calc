
import React from 'react';
import { Pizza } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function PageHeader() {
  const { t } = useLanguage();
  
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-500 text-white py-8 mb-8 shadow-md">
      <div className="container">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <div className="relative">
            <Pizza className="h-12 w-12 animate-pizza-rotate text-yellow-100" />
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-red-400 opacity-20 rounded-full blur-sm"></div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif tracking-tight">{t('appTitle')}</h1>
        </div>
        <p className="text-red-100 text-center md:text-left mt-2 max-w-2xl">
          {t('appSubtitle')}
        </p>
      </div>
    </header>
  );
}
