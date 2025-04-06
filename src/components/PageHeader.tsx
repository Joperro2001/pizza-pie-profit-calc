
import React from 'react';
import { Pizza, CakeSlice } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function PageHeader() {
  const { t } = useLanguage();
  
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-500 text-white py-8 mb-8 shadow-md relative overflow-hidden">
      {/* Decorative pepperoni circles */}
      <div className="absolute top-4 left-10 w-6 h-6 rounded-full bg-red-800 opacity-70 animate-pepperoni-dance" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-12 left-36 w-8 h-8 rounded-full bg-red-800 opacity-70 animate-pepperoni-dance" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute bottom-5 right-20 w-7 h-7 rounded-full bg-red-800 opacity-70 animate-pepperoni-dance" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-10 right-10 w-5 h-5 rounded-full bg-red-800 opacity-70 animate-pepperoni-dance" style={{ animationDelay: '0.3s' }}></div>
      
      {/* Yellow cheese strands */}
      <div className="absolute left-1/4 top-0 w-3 h-10 bg-yellow-300 opacity-40 origin-top animate-cheese-stretch" style={{ animationDelay: '0.2s' }}></div>
      <div className="absolute left-2/4 top-0 w-2 h-12 bg-yellow-300 opacity-40 origin-top animate-cheese-stretch" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute left-3/4 top-0 w-4 h-8 bg-yellow-300 opacity-40 origin-top animate-cheese-stretch" style={{ animationDelay: '1.1s' }}></div>
      
      <div className="container relative z-10">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <div className="relative">
            <Pizza className="h-12 w-12 animate-pizza-rotate text-yellow-100" />
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-red-400 opacity-20 rounded-full blur-sm"></div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif tracking-tight">{t('appTitle')}</h1>
          <CakeSlice className="h-10 w-10 text-yellow-200 animate-slice-wobble" />
        </div>
        <p className="text-red-100 text-center md:text-left mt-2 max-w-2xl">
          {t('appSubtitle')}
        </p>
      </div>
    </header>
  );
}
